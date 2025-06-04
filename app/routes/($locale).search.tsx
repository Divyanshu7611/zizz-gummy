// import {
//   type LoaderFunctionArgs,
//   type ActionFunctionArgs,
// } from '@shopify/remix-oxygen';
// import {useLoaderData, type MetaFunction} from '@remix-run/react';
// import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
// import {SearchForm} from '~/components/SearchForm';
// import {SearchResults} from '~/components/SearchResults';
// import {
//   type RegularSearchReturn,
//   type PredictiveSearchReturn,
//   getEmptyPredictiveSearchResult,
// } from '~/lib/search';

// export const meta: MetaFunction = () => {
//   return [{title: `Hydrogen | Search`}];
// };

// export async function loader({request, context}: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const isPredictive = url.searchParams.has('predictive');
//   const searchPromise: Promise<PredictiveSearchReturn | RegularSearchReturn> =
//     isPredictive
//       ? predictiveSearch({request, context})
//       : regularSearch({request, context});

//   searchPromise.catch((error: Error) => {
//     console.error(error);
//     return {term: '', result: null, error: error.message};
//   });

//   return await searchPromise;
// }

// /**
//  * Renders the /search route
//  */
// export default function SearchPage() {
//   const {type, term, result, error} = useLoaderData<typeof loader>();
//   if (type === 'predictive') return null;

//   return (
//     <div className="search">
//       <h1>Search</h1>
//       <SearchForm>
//         {({inputRef}) => (
//           <>
//             <input
//               defaultValue={term}
//               name="q"
//               placeholder="Search…"
//               ref={inputRef}
//               type="search"
//             />
//             &nbsp;
//             <button type="submit">Search</button>
//           </>
//         )}
//       </SearchForm>
//       {error && <p style={{color: 'red'}}>{error}</p>}
//       {!term || !result?.total ? (
//         <SearchResults.Empty />
//       ) : (
//         <SearchResults result={result} term={term}>
//           {({articles, pages, products, term}) => (
//             <div>
//               <SearchResults.Products products={products} term={term} />
//               <SearchResults.Pages pages={pages} term={term} />
//               <SearchResults.Articles articles={articles} term={term} />
//             </div>
//           )}
//         </SearchResults>
//       )}
//       <Analytics.SearchView data={{searchTerm: term, searchResults: result}} />
//     </div>
//   );
// }

// /**
//  * Regular search query and fragments
//  * (adjust as needed)
//  */
// const SEARCH_PRODUCT_FRAGMENT = `#graphql
//   fragment SearchProduct on Product {
//     __typename
//     handle
//     id
//     publishedAt
//     title
//     trackingParameters
//     vendor
//     selectedOrFirstAvailableVariant(
//       selectedOptions: []
//       ignoreUnknownOptions: true
//       caseInsensitiveMatch: true
//     ) {
//       id
//       image {
//         url
//         altText
//         width
//         height
//       }
//       price {
//         amount
//         currencyCode
//       }
//       compareAtPrice {
//         amount
//         currencyCode
//       }
//       selectedOptions {
//         name
//         value
//       }
//       product {
//         handle
//         title
//       }
//     }
//   }
// ` as const;

// const SEARCH_PAGE_FRAGMENT = `#graphql
//   fragment SearchPage on Page {
//      __typename
//      handle
//     id
//     title
//     trackingParameters
//   }
// ` as const;

// const SEARCH_ARTICLE_FRAGMENT = `#graphql
//   fragment SearchArticle on Article {
//     __typename
//     handle
//     id
//     title
//     trackingParameters
//   }
// ` as const;

// const PAGE_INFO_FRAGMENT = `#graphql
//   fragment PageInfoFragment on PageInfo {
//     hasNextPage
//     hasPreviousPage
//     startCursor
//     endCursor
//   }
// ` as const;

// // NOTE: https://shopify.dev/docs/api/storefront/latest/queries/search
// export const SEARCH_QUERY = `#graphql
//   query RegularSearch(
//     $country: CountryCode
//     $endCursor: String
//     $first: Int
//     $language: LanguageCode
//     $last: Int
//     $term: String!
//     $startCursor: String
//   ) @inContext(country: $country, language: $language) {
//     articles: search(
//       query: $term,
//       types: [ARTICLE],
//       first: $first,
//     ) {
//       nodes {
//         ...on Article {
//           ...SearchArticle
//         }
//       }
//     }
//     pages: search(
//       query: $term,
//       types: [PAGE],
//       first: $first,
//     ) {
//       nodes {
//         ...on Page {
//           ...SearchPage
//         }
//       }
//     }
//     products: search(
//       after: $endCursor,
//       before: $startCursor,
//       first: $first,
//       last: $last,
//       query: $term,
//       sortKey: RELEVANCE,
//       types: [PRODUCT],
//       unavailableProducts: HIDE,
//     ) {
//       nodes {
//         ...on Product {
//           ...SearchProduct
//         }
//       }
//       pageInfo {
//         ...PageInfoFragment
//       }
//     }
//   }
//   ${SEARCH_PRODUCT_FRAGMENT}
//   ${SEARCH_PAGE_FRAGMENT}
//   ${SEARCH_ARTICLE_FRAGMENT}
//   ${PAGE_INFO_FRAGMENT}
// ` as const;

// /**
//  * Regular search fetcher
//  */
// async function regularSearch({
//   request,
//   context,
// }: Pick<
//   LoaderFunctionArgs,
//   'request' | 'context'
// >): Promise<RegularSearchReturn> {
//   const {storefront} = context;
//   const url = new URL(request.url);
//   const variables = getPaginationVariables(request, {pageBy: 8});
//   const term = String(url.searchParams.get('q') || '');

//   // Search articles, pages, and products for the `q` term
//   const {errors, ...items} = await storefront.query(SEARCH_QUERY, {
//     variables: {...variables, term},
//   });

//   if (!items) {
//     throw new Error('No search data returned from Shopify API');
//   }

//   const total = Object.values(items).reduce(
//     (acc, {nodes}) => acc + nodes.length,
//     0,
//   );

//   const error = errors
//     ? errors.map(({message}) => message).join(', ')
//     : undefined;

//   return {type: 'regular', term, error, result: {total, items}};
// }

// /**
//  * Predictive search query and fragments
//  * (adjust as needed)
//  */
// const PREDICTIVE_SEARCH_ARTICLE_FRAGMENT = `#graphql
//   fragment PredictiveArticle on Article {
//     __typename
//     id
//     title
//     handle
//     blog {
//       handle
//     }
//     image {
//       url
//       altText
//       width
//       height
//     }
//     trackingParameters
//   }
// ` as const;

// const PREDICTIVE_SEARCH_COLLECTION_FRAGMENT = `#graphql
//   fragment PredictiveCollection on Collection {
//     __typename
//     id
//     title
//     handle
//     image {
//       url
//       altText
//       width
//       height
//     }
//     trackingParameters
//   }
// ` as const;

// const PREDICTIVE_SEARCH_PAGE_FRAGMENT = `#graphql
//   fragment PredictivePage on Page {
//     __typename
//     id
//     title
//     handle
//     trackingParameters
//   }
// ` as const;

// const PREDICTIVE_SEARCH_PRODUCT_FRAGMENT = `#graphql
//   fragment PredictiveProduct on Product {
//     __typename
//     id
//     title
//     handle
//     trackingParameters
//     selectedOrFirstAvailableVariant(
//       selectedOptions: []
//       ignoreUnknownOptions: true
//       caseInsensitiveMatch: true
//     ) {
//       id
//       image {
//         url
//         altText
//         width
//         height
//       }
//       price {
//         amount
//         currencyCode
//       }
//     }
//   }
// ` as const;

// const PREDICTIVE_SEARCH_QUERY_FRAGMENT = `#graphql
//   fragment PredictiveQuery on SearchQuerySuggestion {
//     __typename
//     text
//     styledText
//     trackingParameters
//   }
// ` as const;

// // NOTE: https://shopify.dev/docs/api/storefront/latest/queries/predictiveSearch
// const PREDICTIVE_SEARCH_QUERY = `#graphql
//   query PredictiveSearch(
//     $country: CountryCode
//     $language: LanguageCode
//     $limit: Int!
//     $limitScope: PredictiveSearchLimitScope!
//     $term: String!
//     $types: [PredictiveSearchType!]
//   ) @inContext(country: $country, language: $language) {
//     predictiveSearch(
//       limit: $limit,
//       limitScope: $limitScope,
//       query: $term,
//       types: $types,
//     ) {
//       articles {
//         ...PredictiveArticle
//       }
//       collections {
//         ...PredictiveCollection
//       }
//       pages {
//         ...PredictivePage
//       }
//       products {
//         ...PredictiveProduct
//       }
//       queries {
//         ...PredictiveQuery
//       }
//     }
//   }
//   ${PREDICTIVE_SEARCH_ARTICLE_FRAGMENT}
//   ${PREDICTIVE_SEARCH_COLLECTION_FRAGMENT}
//   ${PREDICTIVE_SEARCH_PAGE_FRAGMENT}
//   ${PREDICTIVE_SEARCH_PRODUCT_FRAGMENT}
//   ${PREDICTIVE_SEARCH_QUERY_FRAGMENT}
// ` as const;

// /**
//  * Predictive search fetcher
//  */
// async function predictiveSearch({
//   request,
//   context,
// }: Pick<
//   ActionFunctionArgs,
//   'request' | 'context'
// >): Promise<PredictiveSearchReturn> {
//   const {storefront} = context;
//   const url = new URL(request.url);
//   const term = String(url.searchParams.get('q') || '').trim();
//   const limit = Number(url.searchParams.get('limit') || 10);
//   const type = 'predictive';

//   if (!term) return {type, term, result: getEmptyPredictiveSearchResult()};

//   // Predictively search articles, collections, pages, products, and queries (suggestions)
//   const {predictiveSearch: items, errors} = await storefront.query(
//     PREDICTIVE_SEARCH_QUERY,
//     {
//       variables: {
//         // customize search options as needed
//         limit,
//         limitScope: 'EACH',
//         term,
//       },
//     },
//   );

//   if (errors) {
//     throw new Error(
//       `Shopify API errors: ${errors.map(({message}) => message).join(', ')}`,
//     );
//   }

//   if (!items) {
//     throw new Error('No predictive search data returned from Shopify API');
//   }

//   const total = Object.values(items).reduce(
//     (acc, item) => acc + item.length,
//     0,
//   );

//   return {type, term, result: {items, total}};
// }



import { useRef, useEffect } from 'react';
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@shopify/remix-oxygen';
import { Form, FormProps, useLoaderData, type MetaFunction } from '@remix-run/react';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { getEmptyPredictiveSearchResult } from '~/lib/search';

type SearchFormProps = Omit<FormProps, 'children'> & {
  children: (args: {
    inputRef: React.RefObject<HTMLInputElement>;
  }) => React.ReactNode;
};

type RegularSearchReturn = {
  type: 'regular';
  term: string;
  result: { total: number; items: any };
  error?: string;
};

type PredictiveSearchReturn = {
  type: 'predictive';
  term: string;
  result: { items: any; total: number };
};

export const meta: MetaFunction = () => {
  return [{ title: `Hydrogen | Search` }];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isPredictive = url.searchParams.has('predictive');
  const searchPromise: Promise<PredictiveSearchReturn | RegularSearchReturn> =
    isPredictive
      ? predictiveSearch({ request, context })
      : regularSearch({ request, context });

  searchPromise.catch((error: Error) => {
    console.error(error);
    return { term: '', result: null, error: error.message };
  });

  return await searchPromise;
}

/**
 * Search form component that sends search requests to the `/search` route.
 */
function SearchForm({ children, ...props }: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useFocusOnCmdK(inputRef);

  if (typeof children !== 'function') {
    return null;
  }

  return (
    <Form method="get" {...props} className="w-full">
      {children({ inputRef })}
    </Form>
  );
}

/**
 * Focuses the input when cmd+k is pressed
 */
function useFocusOnCmdK(inputRef: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);
}

/**
 * Sample SearchResults component (adjust based on actual implementation)
 */
function SearchResults({ result, term, children }: any) {
  return (
    <div className="mt-8">
      {children({ ...result, term })}
    </div>
  );
}

SearchResults.Empty = () => (
  <div className="text-center py-12 bg-gray-50 rounded-lg">
    <p className="text-lg text-gray-500">No results found. Try another search term.</p>
  </div>
);

SearchResults.Products = ({ products, term }: any) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products</h2>
    {products.length === 0 ? (
      <p className="text-gray-500">No products found for "{term}"</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
          >
            {product.selectedOrFirstAvailableVariant?.image && (
              <img
                src={product.selectedOrFirstAvailableVariant.image.url}
                alt={product.selectedOrFirstAvailableVariant.image.altText || product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.vendor}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              {product.selectedOrFirstAvailableVariant?.price?.amount}{' '}
              {product.selectedOrFirstAvailableVariant?.price?.currencyCode}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

SearchResults.Pages = ({ pages, term }: any) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pages</h2>
    {pages.length === 0 ? (
      <p className="text-gray-500">No pages found for "{term}"</p>
    ) : (
      <ul className="space-y-4">
        {pages.map((page: any) => (
          <li
            key={page.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <a href={`/pages/${page.handle}`} className="text-lg text-blue-600 hover:underline">
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

SearchResults.Articles = ({ articles, term }: any) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Articles</h2>
    {articles.length === 0 ? (
      <p className="text-gray-500">No articles found for "{term}"</p>
    ) : (
      <ul className="space-y-4">
        {articles.map((article: any) => (
          <li
            key={article.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <a href={`/articles/${article.handle}`} className="text-lg text-blue-600 hover:underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

/**
 * Renders the /search route
 */
export default function SearchPage() {
  const { type, term, result, error } = useLoaderData<typeof loader>();
  if (type === 'predictive') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
      <SearchForm>
        {({ inputRef }) => (
          <div className="relative flex items-center w-full max-w-md mx-auto mb-8">
            <input
              ref={inputRef}
              type="search"
              defaultValue={term}
              name="q"
              placeholder="Search products, articles, or pages…"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
              aria-label="Submit search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
        )}
      </SearchForm>
      {error && (
        <p className="text-red-600 bg-red-50 p-4 rounded-lg mb-8">{error}</p>
      )}
      {!term || !result?.total ? (
        <SearchResults.Empty />
      ) : (
        <SearchResults result={result} term={term}>
          {({ articles, pages, products, term }:any) => (
            <div>
              <SearchResults.Products products={products.nodes} term={term} />
              <SearchResults.Pages pages={pages.nodes} term={term} />
              <SearchResults.Articles articles={articles.nodes} term={term} />
            </div>
          )}
        </SearchResults>
      )}
      <Analytics.SearchView data={{ searchTerm: term, searchResults: result }} />
    </div>
  );
}

/**
 * Regular search query and fragments
 * (unchanged from original)
 */
const SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    vendor
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
      product {
        handle
        title
      }
    }
  }
` as const;

const SEARCH_PAGE_FRAGMENT = `#graphql
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
` as const;

const SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
` as const;

const PAGE_INFO_FRAGMENT = `#graphql
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
` as const;

export const SEARCH_QUERY = `#graphql
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: $term,
      types: [ARTICLE],
      first: $first,
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
    pages: search(
      query: $term,
      types: [PAGE],
      first: $first,
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${SEARCH_PRODUCT_FRAGMENT}
  ${SEARCH_PAGE_FRAGMENT}
  ${SEARCH_ARTICLE_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
` as const;

/**
 * Regular search fetcher
 * (unchanged from original)
 */
async function regularSearch({
  request,
  context,
}: Pick<LoaderFunctionArgs, 'request' | 'context'>): Promise<RegularSearchReturn> {
  const { storefront } = context;
  const url = new URL(request.url);
  const variables = getPaginationVariables(request, { pageBy: 8 });
  const term = String(url.searchParams.get('q') || '');

  const { errors, ...items } = await storefront.query(SEARCH_QUERY, {
    variables: { ...variables, term },
  });

  if (!items) {
    throw new Error('No search data returned from Shopify API');
  }

  const total = Object.values(items).reduce(
    (acc, { nodes }) => acc + nodes.length,
    0,
  );

  const error = errors
    ? errors.map(({ message }) => message).join(', ')
    : undefined;

  return { type: 'regular', term, error, result: { total, items } };
}

/**
 * Predictive search query and fragments
 * (unchanged from original)
 */
const PREDICTIVE_SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment PredictiveArticle on Article {
    __typename
    id
    title
    handle
    blog {
      handle
    }
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_COLLECTION_FRAGMENT = `#graphql
  fragment PredictiveCollection on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_PAGE_FRAGMENT = `#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment PredictiveProduct on Product {
    __typename
    id
    title
    handle
    trackingParameters
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
    }
  }
` as const;

const PREDICTIVE_SEARCH_QUERY_FRAGMENT = `#graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_QUERY = `#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $term: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $term,
      types: $types,
    ) {
      articles {
        ...PredictiveArticle
      }
      collections {
        ...PredictiveCollection
      }
      pages {
        ...PredictivePage
      }
      products {
        ...PredictiveProduct
      }
      queries {
        ...PredictiveQuery
      }
    }
  }
  ${PREDICTIVE_SEARCH_ARTICLE_FRAGMENT}
  ${PREDICTIVE_SEARCH_COLLECTION_FRAGMENT}
  ${PREDICTIVE_SEARCH_PAGE_FRAGMENT}
  ${PREDICTIVE_SEARCH_PRODUCT_FRAGMENT}
  ${PREDICTIVE_SEARCH_QUERY_FRAGMENT}
` as const;

/**
 * Predictive search fetcher
 * (unchanged from original)
 */
async function predictiveSearch({
  request,
  context,
}: Pick<ActionFunctionArgs, 'request' | 'context'>): Promise<PredictiveSearchReturn> {
  const { storefront } = context;
  const url = new URL(request.url);
  const term = String(url.searchParams.get('q') || '').trim();
  const limit = Number(url.searchParams.get('limit') || 10);
  const type = 'predictive';

  if (!term) return { type, term, result: getEmptyPredictiveSearchResult() };

  const { predictiveSearch: items, errors } = await storefront.query(
    PREDICTIVE_SEARCH_QUERY,
    {
      variables: {
        limit,
        limitScope: 'EACH',
        term,
      },
    },
  );

  if (errors) {
    throw new Error(
      `Shopify API errors: ${errors.map(({ message }) => message).join(', ')}`,
    );
  }

  if (!items) {
    throw new Error('No predictive search data returned from Shopify API');
  }

  const total = Object.values(items).reduce(
    (acc, item) => acc + item.length,
    0,
  );

  return { type, term, result: { items, total } };
}