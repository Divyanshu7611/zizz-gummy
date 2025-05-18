// import {Suspense} from 'react';
// import {Await, NavLink, useAsyncValue} from '@remix-run/react';
// import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

// import {
//   type CartViewPayload,
//   useAnalytics,
//   useOptimisticCart,
// } from '@shopify/hydrogen';
// import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
// import {useAside} from '~/components/Aside';
// import HeaderTop from './global/HeaderTop';


// interface HeaderProps {
//   header: HeaderQuery;
//   cart: Promise<CartApiQueryFragment | null>;
//   isLoggedIn: Promise<boolean>;
//   publicStoreDomain: string;
// }

// type Viewport = 'desktop' | 'mobile';

// export function Header({
//   header,
//   isLoggedIn,
//   cart,
//   publicStoreDomain,
// }: HeaderProps) {
//   const {shop, menu} = header;
//   return (
//     <div>
//       <HeaderTop/>

//     <header className='header'>
      
//       <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
//         {/* <strong>{shop.name}</strong> */}
//         <img src='/static/logo.png' alt='logo' className='w-20 h-10'/>
//       </NavLink>
//       <HeaderMenu
//         menu={menu}
//         viewport="desktop"
//         primaryDomainUrl={header.shop.primaryDomain.url}
//         publicStoreDomain={publicStoreDomain}
//       />
//       <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
//     </header>
//     </div>
//   );
// }

// export function HeaderMenu({
//   menu,
//   primaryDomainUrl,
//   viewport,
//   publicStoreDomain,
// }: {
//   menu: HeaderProps['header']['menu'];
//   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
//   viewport: Viewport;
//   publicStoreDomain: HeaderProps['publicStoreDomain'];
// }) {
//   const className = `header-menu-${viewport}`;
//   const {close} = useAside();

//   return (
//     <nav className={`flex justify-center items-center gap-5 mx-auto ${className}`} role="navigation">
//       {viewport === 'mobile' && (
//         <NavLink
//           end
//           onClick={close}
//           prefetch="intent"
//           style={activeLinkStyle}
//           to="/"
//         >
//           MyHome
//         </NavLink>
//       )}
//       {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
//         if (!item.url) return null;

//         // if the url is internal, we strip the domain
//         const url =
//           item.url.includes('myshopify.com') ||
//           item.url.includes(publicStoreDomain) ||
//           item.url.includes(primaryDomainUrl)
//             ? new URL(item.url).pathname
//             : item.url;
//         return (
//           <NavLink
//             end
//             key={item.id}
//             onClick={close}
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

// function HeaderCtas({
//   isLoggedIn,
//   cart,
// }: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
//   return (
//     <nav className="header-ctas" role="navigation">
//       <HeaderMenuMobileToggle />
//       <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
//         <Suspense fallback="Sign in">
//           <Await resolve={isLoggedIn} errorElement="Sign in">
//             {(isLoggedIn) => <FaUser/>}
//           </Await>
//         </Suspense>
//       </NavLink>
//       <SearchToggle />
//       <CartToggle cart={cart} />
//     </nav>
//   );
// }

// function HeaderMenuMobileToggle() {
//   const {open} = useAside();
//   return (
//     <button
//       className="header-menu-mobile-toggle reset"
//       onClick={() => open('mobile')}
//     >
//       <h3>☰</h3>
//     </button>
//   );
// }

// function SearchToggle() {
//   const {open} = useAside();
//   return (
//     <button className="reset" onClick={() => open('search')}>
//       <FaSearch/>
//     </button>
//   );
// }

// function CartBadge({count}: {count: number | null}) {
//   const {open} = useAside();
//   const {publish, shop, cart, prevCart} = useAnalytics();

//   return (
//     <a
//       href="/cart"
//       className='flex items-center'
//       onClick={(e) => {
//         e.preventDefault();
//         open('cart');
//         publish('cart_viewed', {
//           cart,
//           prevCart,
//           shop,
//           url: window.location.href || '',
//         } as CartViewPayload);
//       }}
//     >
//       <FaShoppingCart/> {count === null ? <span>&nbsp;</span> : count}
//     </a>
//   );
// }

// function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
//   return (
//     <Suspense fallback={<CartBadge count={null} />}>
//       <Await resolve={cart}>
//         <CartBanner />
//       </Await>
//     </Suspense>
//   );
// }

// function CartBanner() {
//   const originalCart = useAsyncValue() as CartApiQueryFragment | null;
//   const cart = useOptimisticCart(originalCart);
//   return <CartBadge count={cart?.totalQuantity ?? 0} />;
// }

// const FALLBACK_HEADER_MENU = {
//   id: 'gid://shopify/Menu/199655587896',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461609500728',
//       resourceId: null,
//       tags: [],
//       title: 'Collections',
//       type: 'HTTP',
//       url: '/collections',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609533496',
//       resourceId: null,
//       tags: [],
//       title: 'Blog',
//       type: 'HTTP',
//       url: '/blogs/journal',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609566264',
//       resourceId: null,
//       tags: [],
//       title: 'Policies',
//       type: 'HTTP',
//       url: '/policies',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609599032',
//       resourceId: 'gid://shopify/Page/92591030328',
//       tags: [],
//       title: 'About',
//       type: 'PAGE',
//       url: '/pages/about',
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
//     color: isPending ? 'grey' : 'black',
//   };
// }





import {Suspense, useState, useEffect} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
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
  const {shop, menu} = header;
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="w-full">
      <HeaderTop />
      <header className={`sticky top-0 z-0 w-full bg-white ${isScrolled ? 'shadow-md' : ''} transition-all duration-300`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <HeaderMenuMobileToggle />
            <NavLink prefetch="intent" to="/" style={activeLinkStyle} end className="ml-2 md:ml-0">
              <img src='/static/logo.png' alt='logo' className='w-24 h-12 object-contain' />
            </NavLink>
          </div>
          
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
  const className = viewport === 'mobile' ? 'flex flex-col w-full gap-4 py-4' : 'flex justify-center items-center gap-6 mx-auto';
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          className="text-lg font-medium px-4 py-2 hover:bg-gray-100 rounded-md w-full z-100"
        >
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
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
            className={viewport === 'mobile' ? 
              "text-lg font-medium px-4 py-2 hover:bg-gray-100 rounded-md w-full" :
              "text-base font-medium hover:text-gray-900 transition-colors duration-200"}
          > 
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-4" role="navigation">
      <SearchToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className="text-gray-700 hover:text-gray-900">
        <Suspense fallback={<FaUser className="text-xl" />}>
          <Await resolve={isLoggedIn} errorElement={<FaUser className="text-xl" />}>
            {(isLoggedIn) => <FaUser className="text-xl" />}
          </Await>
        </Suspense>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open, close} = useAside();
  
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

function MobileMenu({isOpen, menu, primaryDomainUrl, publicStoreDomain, onClose}:any) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white h-full w-4/5 max-w-sm flex flex-col shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <img src='/static/logo.png' alt='logo' className='w-20 h-10 object-contain' />
          <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
            <FaTimes className="text-xl" />
          </button>
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
  const {open} = useAside();
  return (
    <button 
      className="text-gray-700 hover:text-gray-900 transition-colors duration-200" 
      onClick={() => open('search')}
      aria-label="Search"
    >
      <FaSearch className="text-xl" />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      aria-label="Cart"
      className="relative flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
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
      <FaShoppingCart className="text-xl" /> 
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
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