// Virtual entry point for the app
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as remixBuild from 'virtual:remix/server-build';
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/remix-oxygen';
import {createAppLoadContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const appLoadContext = await createAppLoadContext(
        request,
        env,
        executionContext,
      );

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => appLoadContext,
      });

      const response = await handleRequest(request);

      // Check for cart cookie from action BEFORE committing session cookie
      // The cart cookie should come from the action's headers export
      const existingSetCookies = response.headers.getSetCookie();
      const cartCookieExists = existingSetCookies.some(cookie => cookie.startsWith('cart='));
      
      console.log('[SERVER] Response headers before session commit:', {
        allSetCookies: existingSetCookies.length,
        cartCookieExists,
        setCookieHeaders: existingSetCookies.map(c => c.substring(0, 100)),
      });
      
      if (appLoadContext.session.isPending) {
        const sessionCookie = await appLoadContext.session.commit();
        
        // Always append session cookie to preserve any existing Set-Cookie headers (like cart cookie)
        response.headers.append('Set-Cookie', sessionCookie);
        console.log('[SERVER] Session cookie appended');
        console.log('[SERVER] Session cookie committed:', sessionCookie.substring(0, 100) + '...');
        
        // Log all Set-Cookie headers after appending session cookie
        const allSetCookiesAfter = response.headers.getSetCookie();
        console.log('[SERVER] All Set-Cookie headers after session commit:', {
          count: allSetCookiesAfter.length,
          cookies: allSetCookiesAfter.map(c => c.substring(0, 100)),
        });
      } else {
        console.log('[SERVER] Session isPending is false, not committing session cookie');
        // Even if session is not pending, log existing Set-Cookie headers
        if (existingSetCookies.length > 0) {
          console.log('[SERVER] Existing Set-Cookie headers (session not pending):', {
            count: existingSetCookies.length,
            cookies: existingSetCookies.map(c => c.substring(0, 100)),
          });
        }
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: appLoadContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
