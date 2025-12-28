import { Suspense, useState, useEffect } from 'react';
import { Await, NavLink, useAsyncValue } from '@remix-run/react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import HeaderTop from './global/HeaderTop';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Update state only if scroll position crosses the 20px threshold
      if (currentScrollY > 20 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 20 && isScrolled) {
        setIsScrolled(false);
      }
      lastScrollY = currentScrollY;
    };

    // Debounce the scroll handler to improve performance
    let timeoutId:any;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [isScrolled]);

  return (
    <>
      <div className="fixed top-0 z-200 w-full">
        <HeaderTop />
        <header
          className={`w-full bg-white ${
            isScrolled ? 'shadow-md' : 'shadow-none'
          } transition-shadow duration-300 ease-in-out`}
          style={{ '--header-height': '80px' } as React.CSSProperties}
        >
          <div className="max-w-360 mx-auto px-3 py-3 flex items-center justify-between w-full">
            <div className="md:hidden block">
              <HeaderMenuMobileToggle />
            </div>
            <NavLink
              prefetch="intent"
              to="/"
              style={activeLinkStyle}
              end
              className="ml-2 md:ml-0"
            >
              <img
                src="/static/logo.png"
                alt="logo"
                className="md:w-12 w-10 md:h-12 h-6 object-contain"
              />
            </NavLink>

            <div className="hidden md:block">
              <HeaderMenu
                menu={menu}
                viewport="desktop"
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            </div>

            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>
        </header>
      </div>
      {/* Constant padding to prevent content overlap */}
      <div style={{ paddingTop: '80px' }} />
    </>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className =
    viewport === 'mobile'
      ? 'flex flex-col w-full gap-4 py-4'
      : 'flex justify-center items-center gap-6 mx-auto';
  const { close } = useAside();

  return (
    <nav className={className} role="navigation">
      {/* {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          className="text-lg font-medium px-4 py-2 hover:bg-gray-100 rounded-md w-full z-100"
        >
          Home
        </NavLink>
      )} */}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // Strip domain for internal URLs
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
            className={
              viewport === 'mobile'
                ? 'text-lg font-medium px-4 py-2 hover:bg-gray-100 rounded-md w-full'
                : 'text-base font-medium hover:text-gray-900 transition-colors duration-200'
            }
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({ isLoggedIn, cart }: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-4" role="navigation">
      <SearchToggle />
      <NavLink
        prefetch="intent"
        to="/account"
        style={activeLinkStyle}
        className="text-gray-700 hover:text-gray-900 hidden md:block"
      >
        <Suspense fallback={<FaRegUserCircle className="text-xl" />}>
          <Await resolve={isLoggedIn} errorElement={<FaUser className="text-xl" />}>
            {(isLoggedIn) => <FaRegUserCircle className="text-xl" />}
          </Await>
        </Suspense>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();

  return (
    <button
      className="md:hidden flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
      onClick={() => open('mobile')}
      aria-label="Menu"
    >
      <FaBars className="text-xl" />
    </button>
  );
}

function MobileMenu({
  isOpen,
  menu,
  primaryDomainUrl,
  publicStoreDomain,
  onClose,
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white h-full w-4/5 max-w-sm flex flex-col shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4">
          <img
            src="/static/logo.png"
            alt="logo"
            className="w-20 h-10 object-contain"
          />
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <HeaderMenu
            menu={menu}
            viewport="mobile"
            primaryDomainUrl={primaryDomainUrl}
            publicStoreDomain={publicStoreDomain}
          />
        </div>
      </div>
    </div>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button
      className="text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
      onClick={() => open('search')}
      aria-label="Search"
    >
      <BiSearch className="text-xl font-medium" />
    </button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <button
      aria-label="Cart"
      className="relative flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <FiShoppingCart className="text-xl" />
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599033',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/contact',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? '600' : '500',
    color: isPending ? '#6B7280' : isActive ? '#111827' : '#374151',
  };
}