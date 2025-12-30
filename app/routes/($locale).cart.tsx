import {type MetaFunction, useLoaderData} from '@remix-run/react';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {
  data,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type HeadersFunction,
} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/CartMain';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Cart`}];
};

export const headers: HeadersFunction = ({actionHeaders}) => {
  // Log headers being returned from headers export
  const isHeadersInstance = actionHeaders instanceof Headers;
  console.log('[CART HEADERS EXPORT] actionHeaders:', {
    hasActionHeaders: !!actionHeaders,
    isHeadersInstance,
    setCookie: isHeadersInstance && actionHeaders ? (actionHeaders as Headers).get('Set-Cookie') ? 'present' : 'missing' : 'unknown',
    allHeaders: actionHeaders ? (isHeadersInstance ? Array.from((actionHeaders as Headers).entries()) : Object.entries(actionHeaders as Record<string, string>)) : [],
  });
  
  // In Single Fetch, headers from data() need to be merged correctly
  // The cart cookie from cart.setCartId() should be included
  if (actionHeaders) {
    // Get all Set-Cookie headers (there might be multiple)
    const setCookieValues: string[] = [];
    
    if (isHeadersInstance) {
      (actionHeaders as Headers).forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
          setCookieValues.push(value);
          console.log('[CART HEADERS EXPORT] Found Set-Cookie header:', value.substring(0, 150));
        }
      });
    } else {
      // Plain object
      const headersObj = actionHeaders as Record<string, string>;
      Object.entries(headersObj).forEach(([key, value]) => {
        if (key.toLowerCase() === 'set-cookie') {
          setCookieValues.push(value);
          console.log('[CART HEADERS EXPORT] Found Set-Cookie header:', value.substring(0, 150));
        }
      });
    }
    
    console.log('[CART HEADERS EXPORT] Set-Cookie values count:', setCookieValues.length);
    console.log('[CART HEADERS EXPORT] Set-Cookie values:', setCookieValues);
    
    // Return headers as-is - Remix should handle multiple Set-Cookie headers
    // If actionHeaders is a Headers object, return it directly
    // If it's a plain object, convert it to Headers to ensure proper handling
    if (isHeadersInstance) {
      return actionHeaders as Headers;
    } else {
      // Convert plain object to Headers if needed
      const headersObj = new Headers();
      Object.entries(actionHeaders as Record<string, string>).forEach(([key, value]) => {
        headersObj.set(key, value);
      });
      console.log('[CART HEADERS EXPORT] Converted plain object to Headers:', Array.from(headersObj.entries()));
      return headersObj;
    }
  }
  
  return actionHeaders;
};

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  // Check cookies for debugging
  const cookies = request.headers.get('Cookie');
  console.log('[CART ACTION] Request cookies:', cookies);

  const formData = await request.formData();
  const rawCartFormInput = formData.get(CartForm.INPUT_NAME);

  // Manually parse to preserve selectedVariant for useOptimisticCart
  let action: string | undefined;
  let inputs: any = {};

  if (typeof rawCartFormInput === 'string') {
    try {
      const parsedInput = JSON.parse(rawCartFormInput) as {action?: string; inputs?: any};
      action = parsedInput.action;
      inputs = parsedInput.inputs || {};
    } catch (e) {
      // Fallback to CartForm.getFormInput if parsing fails
      const fallback = CartForm.getFormInput(formData);
      action = fallback.action;
      inputs = fallback.inputs;
    }
  } else {
    const fallback = CartForm.getFormInput(formData);
    action = fallback.action;
    inputs = fallback.inputs;
  }

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      // Clean lines to remove selectedVariant before sending to Shopify API
      const cleanedLines = (inputs.lines as Array<any>).map((line: any) => {
        const {selectedVariant, ...rest} = line;
        return rest;
      });
      
      console.log('[CART ACTION] Adding lines:', JSON.stringify(cleanedLines, null, 2));
      
      // Check if cart exists first - cart.get() will return null if no cart ID cookie
      const existingCart = await cart.get();
      console.log('[CART ACTION] Existing cart check:', {
        hasExistingCart: !!existingCart,
        existingCartId: existingCart?.id,
      });
      
      result = await cart.addLines(cleanedLines);
      
      // Check if there are errors that might indicate an invalid cart ID from old store
      if (result?.errors && result.errors.length > 0) {
        console.warn('[CART ACTION] addLines returned errors (possibly invalid cart ID from old store):', result.errors);
        // If we have errors, try to create a new cart by using cart.create() with the lines
        // This will bypass the old cart ID
        try {
          const createResult = await cart.create({lines: cleanedLines});
          if (createResult?.cart && !createResult.errors) {
            console.log('[CART ACTION] Created new cart after detecting errors:', createResult.cart.id);
            result = createResult;
          }
        } catch (createError) {
          console.error('[CART ACTION] Failed to create new cart:', createError);
          // Continue with original result which has errors - will be handled by client
        }
      }
      
      console.log('[CART ACTION] addLines result:', {
        cartId: result?.cart?.id,
        totalQuantity: result?.cart?.totalQuantity,
        hasLines: !!result?.cart?.lines,
        linesCount: result?.cart?.lines?.nodes?.length,
        errors: result?.errors,
      });
      
      // In Hydrogen 2025.1.4+, cart.addLines() may return minimal cart without lines
      // Fetch full cart to ensure we have lines
      // cart.get() will use the same cart context that addLines() used
      if (result?.cart?.id && (!result.cart.lines?.nodes || result.cart.lines.nodes.length === 0)) {
        console.log('[CART ACTION] addLines returned minimal cart, fetching full cart...');
        const fullCart = await cart.get();
        console.log('[CART ACTION] Full cart fetched:', {
          cartId: fullCart?.id,
          totalQuantity: fullCart?.totalQuantity,
          hasLines: !!fullCart?.lines,
          linesCount: fullCart?.lines?.nodes?.length,
        });
        
        if (fullCart && fullCart.lines?.nodes && fullCart.lines.nodes.length > 0) {
          result = {
            ...result,
            cart: fullCart,
          };
        }
      }
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesUpdate: {
      const formGiftCardCode = inputs.giftCardCode;

      // User inputted gift card code
      const giftCardCodes = (
        formGiftCardCode ? [formGiftCardCode] : []
      ) as string[];

      // Combine gift card codes already applied on cart
      giftCardCodes.push(...inputs.giftCardCodes);

      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  let responseHeaders: Headers | Record<string, string> = {};
  if (cartId) {
    // cart.setCartId() returns headers with the cart cookie
    // This is Hydrogen's way of setting the cart ID cookie
    const cartHeaders = cart.setCartId(result.cart.id);
    
    // Convert Headers object to plain object for data() function
    // Single Fetch's data() function may require plain objects instead of Headers instances
    // IMPORTANT: Use 'Set-Cookie' (capitalized) as the key to match HTTP header standard
    const headersObject: Record<string, string> = {};
    cartHeaders.forEach((value, key) => {
      // Ensure Set-Cookie header includes SameSite attribute (required by modern browsers)
      if (key.toLowerCase() === 'set-cookie') {
        // Use capitalized 'Set-Cookie' key to match HTTP header standard
        const headerKey = 'Set-Cookie';
        // Check if SameSite is already included
        if (!value.includes('SameSite')) {
          // Add SameSite=Lax if not present (Lax is the default for most cookies)
          headersObject[headerKey] = `${value}; SameSite=Lax`;
        } else {
          headersObject[headerKey] = value;
        }
      } else {
        headersObject[key] = value;
      }
    });
    responseHeaders = headersObject;
    
    // Mark session as pending so server.ts commits the session cookie
    context.session.isPending = true;
    
    console.log('[CART ACTION] Cart ID:', cartId);
    console.log('[CART ACTION] Session isPending set to:', context.session.isPending);
    console.log('[CART ACTION] Headers from setCartId:', Array.from(cartHeaders.entries()));
    console.log('[CART ACTION] Headers object being passed to data():', responseHeaders);
    
    // Verify the cart cookie header is present and check its attributes
    const cartCookieHeader = cartHeaders.get('Set-Cookie');
    if (cartCookieHeader) {
      console.log('[CART ACTION] Cart cookie Set-Cookie header (full):', cartCookieHeader);
      // Check if SameSite is included (required for cross-site cookies in modern browsers)
      if (!cartCookieHeader.includes('SameSite')) {
        console.warn('[CART ACTION] ⚠️ Cart cookie missing SameSite attribute - browser may reject it');
      }
      // Log cookie attributes for debugging
      const hasPath = cartCookieHeader.includes('Path=');
      const hasSameSite = cartCookieHeader.includes('SameSite');
      const hasSecure = cartCookieHeader.includes('Secure');
      const hasHttpOnly = cartCookieHeader.includes('HttpOnly');
      console.log('[CART ACTION] Cart cookie attributes:', {hasPath, hasSameSite, hasSecure, hasHttpOnly});
    } else {
      console.error('[CART ACTION] ❌ CRITICAL: No Set-Cookie header from cart.setCartId()!');
    }
  }
  const {cart: cartResult, errors, warnings} = result;

  // Use cartResult directly (already has full cart from LinesAdd case above)
  const finalCart = cartResult;
  
  console.log('[CART ACTION] Final cart being returned:', {
    hasCart: !!finalCart,
    totalQuantity: finalCart?.totalQuantity,
    hasLines: !!finalCart?.lines,
    linesCount: finalCart?.lines?.nodes?.length,
    firstLineId: finalCart?.lines?.nodes?.[0]?.id,
  });

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    // Convert to Headers if it's a plain object, or use it directly if it's already Headers
    if (typeof responseHeaders === 'object' && !(responseHeaders instanceof Headers)) {
      responseHeaders['Location'] = redirectTo;
    } else {
      (responseHeaders as Headers).set('Location', redirectTo);
    }
  }

  // Log the headers that will be returned
  if (responseHeaders instanceof Headers) {
    console.log('[CART ACTION] Headers being returned (Headers object):', {
      headerCount: Array.from(responseHeaders.entries()).length,
      setCookie: responseHeaders.get('Set-Cookie') ? 'present' : 'missing',
    });
  } else {
    // Check both 'Set-Cookie' and 'set-cookie' keys (case-insensitive)
    const setCookieValue = responseHeaders['Set-Cookie'] || responseHeaders['set-cookie'];
    console.log('[CART ACTION] Headers being returned (plain object):', {
      headerCount: Object.keys(responseHeaders).length,
      setCookie: setCookieValue ? 'present' : 'missing',
      setCookieKey: setCookieValue ? (responseHeaders['Set-Cookie'] ? 'Set-Cookie' : 'set-cookie') : 'none',
      headers: responseHeaders,
    });
  }

  return data(
    {
      cart: finalCart,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers: responseHeaders},
  );
}

export async function loader({request, context}: LoaderFunctionArgs) {
  const {cart} = context;
  
  // Check cookies for debugging
  const cookies = request.headers.get('Cookie');
  console.log('[CART LOADER] Request cookies:', cookies);
  
  const cartData = await cart.get();
  
  console.log('[CART LOADER] Cart data:', {
    hasCart: !!cartData,
    cartId: cartData?.id,
    totalQuantity: cartData?.totalQuantity,
    hasLines: !!cartData?.lines,
    linesNodes: cartData?.lines?.nodes,
    linesCount: cartData?.lines?.nodes?.length,
    cartKeys: cartData ? Object.keys(cartData) : [],
  });
  
  return cartData;
}

export default function Cart() {
  const cart = useLoaderData<typeof loader>();

  return (
    <div className="cart overflow-y-auto">
      <h1>Cart</h1>
      <CartMain layout="page" cart={cart} />
    </div>
  );
}
