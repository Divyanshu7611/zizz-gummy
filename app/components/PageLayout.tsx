// import {Await, Link} from '@remix-run/react';
// import {Suspense, useId} from 'react';
// import type {
//   CartApiQueryFragment,
//   FooterQuery,
//   HeaderQuery,
// } from 'storefrontapi.generated';
// import {Aside} from '~/components/Aside';
// import {Footer} from '~/components/Footer';
// import {Header, HeaderMenu} from '~/components/Header';
// import {CartMain} from '~/components/CartMain';
// import {
//   SEARCH_ENDPOINT,
//   SearchFormPredictive,
// } from '~/components/SearchFormPredictive';
// import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

// interface PageLayoutProps {
//   cart: Promise<CartApiQueryFragment | null>;
//   footer: Promise<FooterQuery | null>;
//   header: HeaderQuery;
//   isLoggedIn: Promise<boolean>;
//   publicStoreDomain: string;
//   children?: React.ReactNode;
// }

// export function PageLayout({
//   cart,
//   children = null,
//   footer,
//   header,
//   isLoggedIn,
//   publicStoreDomain,
// }: PageLayoutProps) {
//   console.log('Children Get: ',children)
//   return (
//     <Aside.Provider>
//       <CartAside cart={cart} />
//       <SearchAside />
//       <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
//       {header && (
//         <Header
//           header={header}
//           cart={cart}
//           isLoggedIn={isLoggedIn}
//           publicStoreDomain={publicStoreDomain}
//         />
//       )}
//       <main>{children}</main>
//       <Footer
//         footer={footer}
//         header={header}
//         publicStoreDomain={publicStoreDomain}
//       />
//     </Aside.Provider>
//   );
// }

// function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
//   return (
//     <Aside type="cart" heading="CART">
//       <Suspense fallback={<p>Loading cart ...</p>}>
//         <Await resolve={cart}>
//           {(cart) => {
//             return <CartMain cart={cart} layout="aside" />;
//           }}
//         </Await>
//       </Suspense>
//     </Aside>
//   );
// }

// function SearchAside() {
//   const queriesDatalistId = useId();
//   return (
//     <Aside type="search" heading="SEARCH">
//       <div className="predictive-search">
//         <br />
//         <SearchFormPredictive>
//           {({fetchResults, goToSearch, inputRef}) => (
//             <>
//               <input
//                 name="q"
//                 onChange={fetchResults}
//                 onFocus={fetchResults}
//                 placeholder="Search"
//                 ref={inputRef}
//                 type="search"
//                 list={queriesDatalistId}
//               />
//               &nbsp;
//               <button onClick={goToSearch}>Search</button>
//             </>
//           )}
//         </SearchFormPredictive>

//         <SearchResultsPredictive>
//           {({items, total, term, state, closeSearch}) => {
//             const {articles, collections, pages, products, queries} = items;

//             if (state === 'loading' && term.current) {
//               return <div>Loading...</div>;
//             }

//             if (!total) {
//               return <SearchResultsPredictive.Empty term={term} />;
//             }

//             return (
//               <>
//                 <SearchResultsPredictive.Queries
//                   queries={queries}
//                   queriesDatalistId={queriesDatalistId}
//                 />
//                 <SearchResultsPredictive.Products
//                   products={products}
//                   closeSearch={closeSearch}
//                   term={term}
//                 />
//                 <SearchResultsPredictive.Collections
//                   collections={collections}
//                   closeSearch={closeSearch}
//                   term={term}
//                 />
//                 <SearchResultsPredictive.Pages
//                   pages={pages}
//                   closeSearch={closeSearch}
//                   term={term}
//                 />
//                 <SearchResultsPredictive.Articles
//                   articles={articles}
//                   closeSearch={closeSearch}
//                   term={term}
//                 />
//                 {term.current && total ? (
//                   <Link
//                     onClick={closeSearch}
//                     to={`${SEARCH_ENDPOINT}?q=${term.current}`}
//                   >
//                     <p>
//                       View all results for <q>{term.current}</q>
//                       &nbsp; →
//                     </p>
//                   </Link>
//                 ) : null}
//               </>
//             );
//           }}
//         </SearchResultsPredictive>
//       </div>
//     </Aside>
//   );
// }

// function MobileMenuAside({
//   header,
//   publicStoreDomain,
// }: {
//   header: PageLayoutProps['header'];
//   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
// }) {
//   return (
//     header.menu &&
//     header.shop.primaryDomain?.url && (
//       <Aside type="mobile" heading="MENU">
//         <HeaderMenu
//           menu={header.menu}
//           viewport="mobile"
//           primaryDomainUrl={header.shop.primaryDomain.url}
//           publicStoreDomain={publicStoreDomain}
//         />
//       </Aside>
//     )
//   );
// }




import { Await, Link } from '@remix-run/react';
import { Suspense, useId } from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Aside, useAside } from '~/components/Aside';
import { Footer } from '~/components/Footer';
import { Header, HeaderMenu } from '~/components/Header';
import { CartMain } from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import { SearchResultsPredictive } from '~/components/SearchResultsPredictive';

// Icons for the mobile bottom bar
import { IoHomeOutline } from 'react-icons/io5'; // Home icon
import { AiOutlineMenu } from 'react-icons/ai'; // Category icon
import { FaRegUser } from 'react-icons/fa'; // Account icon
import { FiShoppingCart } from 'react-icons/fi'; // Cart icon

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  console.log('Children Get: ', children);
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main>{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-[100]">
        <Link to="/" className="flex flex-col items-center text-gray-600">
          <IoHomeOutline className="text-xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/collections" prefetch="viewport" className="flex flex-col items-center text-gray-600">
          <AiOutlineMenu className="text-xl" />
          <span className="text-xs">Category</span>
        </Link>
        <Link to="/account" className="flex flex-col items-center text-gray-600">
          <FaRegUser className="text-xl" />
          <span className="text-xs">Account</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center text-gray-600">
          <FiShoppingCart className="text-xl" />
          <span className="text-xs">Cart</span>
        </Link>
      </nav>
    </Aside.Provider>
  );
}

function CartAside({ cart }: { cart: PageLayoutProps['cart'] }) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}




function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive className='flex px-2 gap-3'>
          {({ fetchResults, goToSearch, inputRef }) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
               
              <button onClick={goToSearch} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                        →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  const { close } = useAside();
  
  return (
    <Aside type="mobile" heading="MENU">
      <div className="flex flex-col h-full min-h-0 relative">
        {/* Menu Items */}
        <nav className="flex flex-col w-full flex-1 overflow-y-auto pb-32">
          <Link
            to="/"
            onClick={close}
            className="text-lg font-medium text-[#1F1F1F] py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors inter"
          >
            HOME
          </Link>
          <Link
            to="/about"
            onClick={close}
            className="text-lg font-medium text-[#1F1F1F] py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors inter"
          >
            ABOUT US
          </Link>
          <Link
            to="/contact"
            onClick={close}
            className="text-lg font-medium text-[#1F1F1F] py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors inter"
          >
            CONTACT US
          </Link>
          <Link
            to="/collections"
            onClick={close}
            className="text-lg font-medium text-[#1F1F1F] py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors inter"
          >
            All Products
          </Link>
        </nav>

        {/* Social Media Icons - Fixed at Absolute Bottom */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 pt-4 border-t border-gray-200 bg-white">
          <div className="flex justify-center items-center gap-6">
            <a
              href="mailto:info@zizzgummy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Aside>
  );
}
