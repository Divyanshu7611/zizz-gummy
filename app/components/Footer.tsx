import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { Image } from '@shopify/hydrogen';

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
          <footer className="bg-[#181818] text-white px-8 pt-12 pb-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Branding */}
              <div>
                <div className='block w-fit'>
                  <Image src='/static/logo_white.png' className='w-[45px] h-[22.5px] md:w-[101px] md:h-[50.5px]'/> 
                </div>
                <p className="text-sm text-[#FAFAFA] opacity-80 mt-3">
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
                <h3 className="font-semibold mb-2 text-lg md:text-2xl">About Us</h3>
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
                <h3 className="font-semibold mb-2 text-lg md:text-2xl">Support</h3>
                <nav className="space-y-2 text-sm text-[#FAFAFA]">
                  {FALLBACK_FOOTER_MENU.items.map((item) => (
                    <NavLink key={item.id} to={item.url} prefetch="intent" className='flex text-[#FAFAFA] opacity-90 flex-col'>
                      {item.title}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Email subscription */}
              <div>
                <h3 className="mb-2 text-xl md:text-[28px] font-extrabold">GET ON THE LIST</h3>
                <p className="text-sm text-[#FAFAFA] opacity-90 mb-4">
                  Join our community for wellness tips, exclusive offers & more.
                </p>
                <form className="flex rounded overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 text-white text-xs border-white border-2 focus:outline"
                  />
                  <button type="submit" className="bg-[#b9f4d2] px-4 py-2 cursor-pointer text-sm font-semibold text-black">
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
    <nav className="space-y-2 text-sm text-gray-300 flex flex-col" role="navigation">
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
