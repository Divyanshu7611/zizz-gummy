// import {useOptimisticCart} from '@shopify/hydrogen';
// import {Link} from '@remix-run/react';
// import type {CartApiQueryFragment} from 'storefrontapi.generated';
// import {useAside} from '~/components/Aside';
// import {CartLineItem} from '~/components/CartLineItem';
// import {CartSummary} from './CartSummary';
// import Button from './mini/Button';
// import { FiShoppingCart } from 'react-icons/fi';

// export type CartLayout = 'page' | 'aside';

// export type CartMainProps = {
//   cart: CartApiQueryFragment | null;
//   layout: CartLayout;
// };

// /**
//  * The main cart component that displays the cart items and summary.
//  * It is used by both the /cart route and the cart aside dialog.
//  */
// export function CartMain({layout, cart: originalCart}: CartMainProps) {
//   // The useOptimisticCart hook applies pending actions to the cart
//   // so the user immediately sees feedback when they modify the cart.
//   const cart = useOptimisticCart(originalCart);

//   const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
//   const withDiscount =
//     cart &&
//     Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
//   const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
//   const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

//   return (
//     <div className={className}>
//       <CartEmpty hidden={linesCount} layout={layout} />
//       <div>
//         <div aria-labelledby="cart-lines">
//           <ul className='mb-2'>
//             {(cart?.lines?.nodes ?? []).map((line) => (
//               <CartLineItem key={line.id} line={line} layout={layout} />
//             ))}
//           </ul>
//         </div>
//         {cartHasItems && <CartSummary cart={cart} layout={layout} />}
//       </div>
//     </div>
//   );
// }

// function CartEmpty({
//   hidden = false,
// }: {
//   hidden: boolean;
//   layout?: CartMainProps['layout'];
// }) {
//   const {close} = useAside();

//     return (
//     <div
//       hidden={hidden}
//       className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-10"
//     >
//       <FiShoppingCart className="text-6xl text-black mb-6" />
//       <p className="text-lg text-gray-700 mb-4">
//         Looks like you haven’t added anything yet. Let’s get you started!
//       </p>
//       <Link
//         to="/collections"
//         onClick={close}
//         prefetch="viewport"
//         className="inline-block bg-black hover:-translate-y-1 text-white text-sm font-medium px-6 py-3 rounded-lg transition duration-200"
//       >
//         Continue Shopping →
//       </Link>
//     </div>
//   );

// }



import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import Button from './mini/Button';
import { FiShoppingCart } from 'react-icons/fi';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  // Debug logging
  console.log('[CartMain] Render:', {
    hasOriginalCart: !!originalCart,
    originalCartTotalQuantity: originalCart?.totalQuantity,
    originalCartLinesCount: originalCart?.lines?.nodes?.length,
    hasOptimisticCart: !!cart,
    optimisticCartTotalQuantity: cart?.totalQuantity,
    optimisticCartLinesCount: cart?.lines?.nodes?.length,
    linesNodes: cart?.lines?.nodes,
  });

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''} ${layout === 'aside' ? 'max-h-[calc(100vh-8rem)]' : 'max-h-[calc(100vh-4rem)]'} overflow-y-auto p-2 bg-white min-h-0 flex flex-col`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="flex-1">
        <div aria-labelledby="cart-lines">
          <ul className="mb-4 flex flex-col gap-3 w-full min-w-xs">
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
  layout,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();

  return (
    <div
      hidden={hidden}
      className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-lg max-w-xl mx-auto my-6"
    >
      <FiShoppingCart className="text-6xl text-black mb-6" />
      <p className="text-lg text-gray-700 mb-4">
        Looks like you haven’t added anything yet. Let’s get you started!
      </p>
      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="inline-block bg-black hover:-translate-y-1 text-white text-sm font-medium px-6 py-3 rounded-lg transition duration-200"
      >
        Continue Shopping →
      </Link>
    </div>
  );
}

