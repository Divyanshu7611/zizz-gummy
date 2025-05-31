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
import { Aside } from '~/components/Aside';
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
        <Link to="/collections" className="flex flex-col items-center text-gray-600">
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
        <SearchFormPredictive>
          {({ fetchResults, goToSearch, inputRef }) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
               
              <button onClick={goToSearch}>Search</button>
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
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      < Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}
