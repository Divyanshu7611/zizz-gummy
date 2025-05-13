// import {Suspense} from 'react';
// import {Await, NavLink} from '@remix-run/react';
// import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

// interface FooterProps {
//   footer: Promise<FooterQuery | null>;
//   header: HeaderQuery;
//   publicStoreDomain: string;
// }

// export function Footer({
//   footer: footerPromise,
//   header,
//   publicStoreDomain,
// }: FooterProps) {
//   return (
//     <Suspense>
//       <Await resolve={footerPromise}>
//         {(footer) => (
//           <footer className="footer">
//             {footer?.menu && header.shop.primaryDomain?.url && (
//               <FooterMenu
//                 menu={footer.menu}
//                 primaryDomainUrl={header.shop.primaryDomain.url}
//                 publicStoreDomain={publicStoreDomain}
//               />
//             )}
//           </footer>
//         )}
//       </Await>
//     </Suspense>
//   );
// }

// function FooterMenu({
//   menu,
//   primaryDomainUrl,
//   publicStoreDomain,
// }: {
//   menu: FooterQuery['menu'];
//   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
//   publicStoreDomain: string;
// }) {
//   return (
//     <nav className="footer-menu" role="navigation">
//       {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
//         if (!item.url) return null;
//         // if the url is internal, we strip the domain
//         const url =
//           item.url.includes('myshopify.com') ||
//           item.url.includes(publicStoreDomain) ||
//           item.url.includes(primaryDomainUrl)
//             ? new URL(item.url).pathname
//             : item.url;
//         const isExternal = !url.startsWith('/');
//         return isExternal ? (
//           <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
//             {item.title}
//           </a>
//         ) : (
//           <NavLink
//             end
//             key={item.id}
//             prefetch="intent"
//             style={activeLinkStyle}
//             to={url}
//           >
//             {item.title}
//           </NavLink>
//         );
//       })}
//     </nav>
//   );
// }

// const FALLBACK_FOOTER_MENU = {
//   id: 'gid://shopify/Menu/199655620664',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461633060920',
//       resourceId: 'gid://shopify/ShopPolicy/23358046264',
//       tags: [],
//       title: 'Privacy Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/privacy-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633093688',
//       resourceId: 'gid://shopify/ShopPolicy/23358013496',
//       tags: [],
//       title: 'Refund Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/refund-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633126456',
//       resourceId: 'gid://shopify/ShopPolicy/23358111800',
//       tags: [],
//       title: 'Shipping Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/shipping-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633159224',
//       resourceId: 'gid://shopify/ShopPolicy/23358079032',
//       tags: [],
//       title: 'Terms of Service',
//       type: 'SHOP_POLICY',
//       url: '/policies/terms-of-service',
//       items: [],
//     },
//   ],
// };

// function activeLinkStyle({
//   isActive,
//   isPending,
// }: {
//   isActive: boolean;
//   isPending: boolean;
// }) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'white',
//   };
// }




import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-[#181818] text-white px-8 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Branding */}
              <div>
                <div className="text-3xl font-bold mb-2">zizz</div>
                <p className="text-sm text-gray-300">
                  Delicious and nutritious vitamin gummies for your daily wellness routine.
                </p>
                <div className="mt-4">
                  <p className="font-semibold mb-2">Follow Us</p>
                  <div className="flex space-x-3 text-xl mt-2">
                    <a href="#"><FaFacebookF className='text-white'/></a>
                    <a href="#"><BsInstagram className='text-white'/></a>
                    <a href="#"><FaLinkedin className='text-white'/></a>
                    <a href="#"><FaPinterest className='text-white'/></a>
                  </div>
                </div>
              </div>

              {/* About Us - Shopify Menu */}
              <div>
                <h3 className="font-semibold mb-2">About Us</h3>
                {footer?.menu && header.shop.primaryDomain?.url && (
                  <FooterMenu
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </div>

              {/* Support - fallback static links */}
              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <nav className="space-y-2 text-sm text-gray-300">
                  {FALLBACK_FOOTER_MENU.items.map((item) => (
                    <NavLink key={item.id} to={item.url} prefetch="intent">
                      {item.title}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Email subscription */}
              <div>
                <h3 className="font-semibold mb-2">GET ON THE LIST</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Join our community for wellness tips, exclusive offers & more.
                </p>
                <form className="flex rounded overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 text-black border-white border-2"
                  />
                  <button type="submit" className="bg-[#b9f4d2] px-4 py-2 font-semibold text-black">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-400">
              © 2025 Zizz Wellness. All rights reserved.
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="space-y-2 text-sm text-gray-300" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            to={url}
            className={({isActive, isPending}) =>
              `hover:text-white ${isActive ? 'font-bold' : ''} ${
                isPending ? 'text-gray-400' : ''
              }`
            }
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      title: 'Privacy Policy',
      url: '/policies/privacy-policy',
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      title: 'Refund Policy',
      url: '/policies/refund-policy',
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      title: 'Shipping Policy',
      url: '/policies/shipping-policy',
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      title: 'Terms of Service',
      url: '/policies/terms-of-service',
    },
  ],
};
