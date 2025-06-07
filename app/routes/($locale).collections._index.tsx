// import {useLoaderData, Link} from '@remix-run/react';
// import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
// import {getPaginationVariables, Image} from '@shopify/hydrogen';
// import type {CollectionFragment} from 'storefrontapi.generated';
// import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

// export async function loader(args: LoaderFunctionArgs) {
//   // Start fetching non-critical data without blocking time to first byte
//   const deferredData = loadDeferredData(args);

//   // Await the critical data required to render initial state of the page
//   const criticalData = await loadCriticalData(args);

//   return {...deferredData, ...criticalData};
// }

// /**
//  * Load data necessary for rendering content above the fold. This is the critical data
//  * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
//  */
// async function loadCriticalData({context, request}: LoaderFunctionArgs) {
//   const paginationVariables = getPaginationVariables(request, {
//     pageBy: 4,
//     pageInfo: undefined
//   });

//   const [{collections}] = await Promise.all([
//     context.storefront.query(COLLECTIONS_QUERY, {
//       variables: paginationVariables,
//     }),
//     // Add other queries here, so that they are loaded in parallel
//   ]);

//   return {collections};
// }

// /**
//  * Load data for rendering content below the fold. This data is deferred and will be
//  * fetched after the initial page load. If it's unavailable, the page should still 200.
//  * Make sure to not throw any errors here, as it will cause the page to 500.
//  */
// function loadDeferredData({context}: LoaderFunctionArgs) {
//   return {};
// }

// export default function Collections() {
//   const {collections} = useLoaderData<typeof loader>();
//   console.log('Loging Collections',collections)

//   return (
//     <div className="collections">
//       <h1>Collections</h1>
//       <PaginatedResourceSection
//         connection={collections}
//         resourcesClassName="collections-grid"
//       >
//         {({node: collection, index}) => (
//           <CollectionItem
//             key={collection.id}
//             collection={collection}
//             index={index}
//           />
//         )}
//       </PaginatedResourceSection>
//     </div>
//   );
// }

// function CollectionItem({
//   collection,
//   index,
// }: {
//   collection: CollectionFragment;
//   index: number;
// }) {
//   return (
//     <Link
//       className="collection-item"
//       key={collection.id}
//       to={`/collections/${collection.handle}`}
//       prefetch="intent"
//     >
//       {collection?.image && (
//         <Image
//           alt={collection.image.altText || collection.title}
//           aspectRatio="1/1"
//           data={collection.image}
//           loading={index < 3 ? 'eager' : undefined}
//           sizes="(min-width: 45em) 400px, 100vw"
//         />
//       )}
//       <h5>{collection.title}</h5>
//     </Link>
//   );
// }

// const COLLECTIONS_QUERY = `#graphql
//   fragment Collection on Collection {
//     id
//     title
//     description
//     handle
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//   }
//   query StoreCollections(
//     $country: CountryCode
//     $endCursor: String
//     $first: Int
//     $language: LanguageCode
//     $last: Int
//     $startCursor: String
//   ) @inContext(country: $country, language: $language) {
//     collections(
//       first: $first,
//       last: $last,
//       before: $startCursor,
//       after: $endCursor
//     ) {
//       nodes {
//         ...Collection
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//     }
//   }
// ` as const;



import { useLoaderData, Link } from '@remix-run/react';
import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { getPaginationVariables, Image } from '@shopify/hydrogen';
import type { CollectionFragment } from 'storefrontapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

// Define TypeScript interface for loader data
interface LoaderData {
  collections: {
    nodes: CollectionFragment[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  };
}

// Loader functions (unchanged)
export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, request }: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 6,
    pageInfo: undefined,
  });

  const [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
  ]);

  return { collections };
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

// Collections Component
export default function Collections() {
  const { collections } = useLoaderData<LoaderData>();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="sm:text-4xl text-xl font-bold text-black inter">
          Our Collections
        </h1>
        <p className="mt-2 sm:text-lg text-sm text-black max-w-2xl mx-auto inter">
          Explore our curated selection of premium products
        </p>
      </header>
      {collections?.nodes?.length ? (
        <PaginatedResourceSection
          connection={collections} 
          resourcesClassName="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {({ node: collection, index }: { node: CollectionFragment; index: number }) => (
            <CollectionItem key={collection.id} collection={collection} index={index} />
          )}
        </PaginatedResourceSection>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No collections found.</p>
        </div>
      )}
    </section>
  );
}

// CollectionItem Component
function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      to={`/collections/${collection.handle}`}
      prefetch="intent"
      className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      aria-label={`View ${collection.title} collection`}
    >
      <div className="bg-white">
        {collection?.image ? (
          <div className="relative overflow-hidden">
            <Image
              alt={collection.image.altText || collection.title}
              aspectRatio="1/1"
              data={collection.image}
              loading={index < 3 ? 'eager' : 'lazy'}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 100vw"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        <div className="text-center pt-4">
          <h5 className="md:text-lg text-sm font-semibold text-gray-900 mb-2 px-4 h-12 md:h-6">
            {collection.title}
          </h5>
          {collection.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 px-4 h-10 md:block hidden">
              {collection.description}
            </p>
          )}
          <button className="text-sm font-medium text-white bg-black py-2 w-full transition-colors duration-200 cursor-pointer">
            Shop Now
          </button>
        </div>
      </div>
    </Link>
  );
}

// GraphQL Query (unchanged)
const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    description
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
