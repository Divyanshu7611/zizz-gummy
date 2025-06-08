// import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
// import {useLoaderData, type MetaFunction} from '@remix-run/react';
// import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
// import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
// import {redirectIfHandleIsLocalized} from '~/lib/redirect';
// import {ProductItem} from '~/components/ProductItem';
// import {useState, useEffect} from 'react';
// import type {Collection as CollectionType, Product} from '@shopify/hydrogen/storefront-api-types';

// export const meta: MetaFunction<typeof loader> = ({data}) => {
//   return [{title: `Hydrogen | ${data?.collection?.title ?? ''} Collection`}];
// };

// export async function loader(args: LoaderFunctionArgs) {
//   const deferredData = loadDeferredData(args);
//   const criticalData = await loadCriticalData(args);
//   return {...deferredData, ...criticalData};
// }

// interface LoaderData {
//   collection: CollectionType;
// }

// async function loadCriticalData({
//   context,
//   params,
//   request,
// }: LoaderFunctionArgs) {
//   const {handle} = params;
//   const {storefront} = context;
//   const paginationVariables = getPaginationVariables(request, {
//     pageBy: 8,
//     pageInfo: undefined
//   });

//   if (!handle) {
//     throw redirect('/collections');
//   }

//   const [{collection}] = await Promise.all([
//     storefront.query(COLLECTION_QUERY, {
//       variables: {handle, ...paginationVariables},
//     }),
//   ]);

//   if (!collection) {
//     throw new Response(`Collection ${handle} not found`, {
//       status: 404,
//     });
//   }

//   redirectIfHandleIsLocalized(request, {handle, data: collection});

//   return {
//     collection,
//   };
// }

// function loadDeferredData({context}: LoaderFunctionArgs) {
//   return {};
// }

// export default function Collection() {
//   const {collection} = useLoaderData<LoaderData>();
//   const [sortBy, setSortBy] = useState<string>('BEST_SELLING');
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(collection.products.nodes);
//   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

//   const categories = ['Skin', 'Dark Circle'];
//   const steps = ['Cleanse'];

//   useEffect(() => {
//     let sortedProducts = [...collection.products.nodes];

//     // Apply price filter
//     sortedProducts = sortedProducts.filter(product => {
//       const price = parseFloat(product.priceRange.minVariantPrice.amount);
//       return price >= priceRange[0] && price <= priceRange[1];
//     });

//     // Apply category filter
//     if (selectedCategories.length > 0) {
//       sortedProducts = sortedProducts.filter(product => 
//         selectedCategories.includes(product.productType || '')
//       );
//     }

//     // Apply step filter (placeholder logic)
//     if (selectedSteps.length > 0) {
//       sortedProducts = sortedProducts.filter(product => 
//         selectedSteps.includes(product.tags?.find(tag => steps.includes(tag)) || '')
//       );
//     }

//     // Apply sorting
//     if (sortBy === 'PRICE_ASC') {
//       sortedProducts.sort((a, b) => 
//         parseFloat(a.priceRange.minVariantPrice.amount) - 
//         parseFloat(b.priceRange.minVariantPrice.amount)
//       );
//     } else if (sortBy === 'PRICE_DESC') {
//       sortedProducts.sort((a, b) => 
//         parseFloat(b.priceRange.minVariantPrice.amount) - 
//         parseFloat(a.priceRange.minVariantPrice.amount)
//       );
//     } else if (sortBy === 'NEWEST') {
//       sortedProducts.sort((a, b) => 
//         new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
//       );
//     } else if (sortBy === 'OLDEST') {
//       sortedProducts.sort((a, b) => 
//         new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
//       );
//     }

//     setFilteredProducts(sortedProducts);
//   }, [sortBy, priceRange, selectedCategories, selectedSteps, collection.products.nodes]);

//   const handleCategoryToggle = (category: string) => {
//     setSelectedCategories(prev => 
//       prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
//     );
//   };

//   const handleStepToggle = (step: string) => {
//     setSelectedSteps(prev => 
//       prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 inter">
//       {/* Header Section */}
//       <div className="text-center mb-8">
//         <h1 className="md:text-4xl text-2xl font-bold mb-4 inter">{collection.title}</h1>
//         <p className="text-gray-600 max-w-2xl mx-auto inter">
//           {collection.description}
//         </p>
//       </div>

//       {/* Mobile Filter Button */}
//       <div className="md:hidden mb-4">
//         <button
//           onClick={() => setIsFilterOpen(true)}
//           className="w-full py-2 px-4 bg-black rounded-md text-white font-medium poppins"
//         >
//           Filter & Sort
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar Filters - Hidden on mobile until button is clicked */}
//         <div className={`fixed z-[2000] md:z-[50] inset-0 bg-white p-6 transform transition-transform duration-300 md:static md:w-1/4 md:bg-transparent md:p-0 md:transform-none ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//           <div className="md:hidden flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Filters</h2>
//             <button onClick={() => setIsFilterOpen(false)} className="text-gray-600">
//               ✕
//             </button>
//           </div>
          
//           <div className="space-y-6">
//             {/* Sort By */}
//             <div>
//               <h3 className="text-lg font-medium mb-2">Sort by:</h3>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="BEST_SELLING">Best Selling</option>
//                 <option value="PRICE_ASC">Price: Low to High</option>
//                 <option value="PRICE_DESC">Price: High to Low</option>
//                 <option value="NEWEST">Newest</option>
//                 <option value="OLDEST">Oldest</option>
//               </select>
//             </div>

//             {/* Price Range Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-2">Price Range</h3>
//               <div className="flex gap-4">
//                 <input
//                   type="number"
//                   min="0"
//                   value={priceRange[0]}
//                   onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
//                   className="w-full p-2 border rounded"
//                   placeholder="Min"
//                 />
//                 <input
//                   type="number"
//                   min="0"
//                   value={priceRange[1]}
//                   onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
//                   className="w-full p-2 border rounded"
//                   placeholder="Max"
//                 />
//               </div>
//             </div>

//             {/* Category Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-2">Category</h3>
//               {categories.map(category => (
//                 <div key={category} className="flex items-center mb-2">
//                   <input
//                     type="checkbox"
//                     id={category}
//                     checked={selectedCategories.includes(category)}
//                     onChange={() => handleCategoryToggle(category)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={category}>{category}</label>
//                 </div>
//               ))}
//             </div>

//             {/* Step Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-2">Step</h3>
//               {steps.map(step => (
//                 <div key={step} className="flex items-center mb-2">
//                   <input
//                     type="checkbox"
//                     id={step}
//                     checked={selectedSteps.includes(step)}
//                     onChange={() => handleStepToggle(step)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={step}>{step}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="md:w-3/4">
//           <div className="mb-6">
//             <p className="text-gray-600">Showing {filteredProducts.length} products</p>
//           </div>

//           <PaginatedResourceSection
//             connection={{...collection.products, nodes: filteredProducts}}
//             resourcesClassName="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {({node: product, index}: {node: Product, index: number}) => (
//               <ProductItem
//                 key={product.id}
//                 product={product}
//                 loading={index < 8 ? 'eager' : undefined}
//               />
//             )}
//           </PaginatedResourceSection>

//           <Analytics.CollectionView
//             data={{
//               collection: {
//                 id: collection.id,
//                 handle: collection.handle,
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


// const PRODUCT_ITEM_FRAGMENT = `#graphql
//   fragment MoneyProductItem on MoneyV2 {
//     amount
//     currencyCode
//   }
//   fragment ProductItem on Product {
//     id
//     handle
//     title
//     description
//     productType
//     tags
//     createdAt
//     variants(first: 3) {
//       nodes {
//         id
//         title
//         availableForSale
//         price {
//           ...MoneyProductItem
//         }
//         compareAtPrice {
//           ...MoneyProductItem
//         }
//         selectedOptions {
//           name
//           value
//         }
//       }
//     }
//     metafields(identifiers: [{namespace: "custom", key: "short_description"}]) {
//       id
//       namespace
//       key
//       value
//     }
//     sellingPlanGroups(first: 1) {
//       nodes {
//         sellingPlans(first: 1) {
//           nodes {
//             id
//             name
//           }
//         }
//       }
//     }
//     featuredImage {
//       id
//       altText
//       url
//       width
//       height
//     }
//     priceRange {
//       minVariantPrice {
//         ...MoneyProductItem
//       }
//       maxVariantPrice {
//         ...MoneyProductItem
//       }
//     }
//   }
// ` as const;

// const COLLECTION_QUERY = `#graphql
//   ${PRODUCT_ITEM_FRAGMENT}
//   query Collection(
//     $handle: String!
//     $country: CountryCode
//     $language: LanguageCode
//     $first: Int
//     $last: Int
//     $startCursor: String
//     $endCursor: String
//   ) @inContext(country: $country, language: $language) {
//     collection(handle: $handle) {
//       id
//       handle
//       title
//       description
//       products(
//         first: $first,
//         last: $last,
//         before: $startCursor,
//         after: $endCursor
//       ) {
//         nodes {
//           ...ProductItem
//         }
//         pageInfo {
//           hasPreviousPage
//           hasNextPage
//           endCursor
//           startCursor
//         }
//       }
//     }
//   }
// ` as const;


import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import {useState, useEffect} from 'react';
import type {Collection as CollectionType, Product} from '@shopify/hydrogen/storefront-api-types';
import {BsGrid1X2, BsGrid, BsGrid3X3Gap} from 'react-icons/bs';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection?.title ?? ''} Collection`}];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

interface LoaderData {
  collection: CollectionType;
}

async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
    pageInfo: undefined
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<LoaderData>();
  const [sortBy, setSortBy] = useState<string>('BEST_SELLING');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(collection.products.nodes);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<string>('grid-cols-2'); // Default for mobile

  const categories = ['Skin', 'Dark Circle'];
  const steps = ['Cleanse'];

  useEffect(() => {
    let sortedProducts = [...collection.products.nodes];

    // Apply price filter
    sortedProducts = sortedProducts.filter(product => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply category filter
    if (selectedCategories.length > 0) {
      sortedProducts = sortedProducts.filter(product => 
        selectedCategories.includes(product.productType || '')
      );
    }

    // Apply step filter (placeholder logic)
    if (selectedSteps.length > 0) {
      sortedProducts = sortedProducts.filter(product => 
        selectedSteps.includes(product.tags?.find(tag => steps.includes(tag)) || '')
      );
    }

    // Apply sorting
    if (sortBy === 'PRICE_ASC') {
      sortedProducts.sort((a, b) => 
        parseFloat(a.priceRange.minVariantPrice.amount) - 
        parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === 'PRICE_DESC') {
      sortedProducts.sort((a, b) => 
        parseFloat(b.priceRange.minVariantPrice.amount) - 
        parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === 'NEWEST') {
      sortedProducts.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    } else if (sortBy === 'OLDEST') {
      sortedProducts.sort((a, b) => 
        new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
      );
    }

    setFilteredProducts(sortedProducts);
  }, [sortBy, priceRange, selectedCategories, selectedSteps, collection.products.nodes]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleStepToggle = (step: string) => {
    setSelectedSteps(prev => 
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  const handleGridChange = (cols: string) => {
    setGridCols(cols);
  };

  return (
    <div className="container mx-auto px-4 py-8 inter">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="md:text-4xl text-2xl font-bold mb-4 inter">{collection.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto inter">
          {collection.description}
        </p>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-full py-2 px-4 bg-black rounded-md text-white font-medium poppins"
        >
          Filter & Sort
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Fixed on md and larger screens */}
        <div className={`fixed z-[2000] md:z-[50] inset-0 bg-white p-6 transform transition-transform duration-300 md:w-1/4 md:bg-transparent md:p-0 md:transform-none md:sticky md:top-4 md:self-start ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="md:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="text-gray-600">
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Sort By */}
            <div>
              <h3 className="text-lg font-medium mb-2">Sort by:</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="BEST_SELLING">Best Selling</option>
                <option value="PRICE_ASC">Price: Low to High</option>
                <option value="PRICE_DESC">Price: High to Low</option>
                <option value="NEWEST">Newest</option>
                <option value="OLDEST">Oldest</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-lg font-medium mb-2">Price Range</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                  className="w-full p-2 border rounded"
                  placeholder="Min"
                />
                <input
                  type="number"
                  min="0"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                  className="w-full p-2 border rounded"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-medium mb-2">Category</h3>
              {categories.map(category => (
                <div key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>

            {/* Step Filter */}
            <div>
              <h3 className="text-lg font-medium mb-2">Step</h3>
              {steps.map(step => (
                <div key={step} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={step}
                    checked={selectedSteps.includes(step)}
                    onChange={() => handleStepToggle(step)}
                    className="mr-2"
                  />
                  <label htmlFor={step}>{step}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
            {/* Grid View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => handleGridChange('grid-cols-1')}
                className={`p-2 rounded ${gridCols === 'grid-cols-1' ? 'bg-gray-200' : ''}`}
                title="Single Column"
              >
                <BsGrid1X2 size={20} />
              </button>
              <button
                onClick={() => handleGridChange('grid-cols-2')}
                className={`p-2 rounded ${gridCols === 'grid-cols-2' ? 'bg-gray-200' : ''}`}
                title="Two Columns"
              >
                <BsGrid size={20} />
              </button>
              <button
                onClick={() => handleGridChange('grid-cols-3')}
                className={`p-2 rounded ${gridCols === 'grid-cols-3' ? 'bg-gray-200' : ''}`}
                title="Three Columns"
              >
                <BsGrid3X3Gap size={20} />
              </button>
            </div>
          </div>

          <PaginatedResourceSection
            connection={{...collection.products, nodes: filteredProducts}}
            resourcesClassName={`grid ${gridCols} sm:grid-cols-2 lg:${gridCols} gap-6`}
          >
            {({node: product, index}: {node: Product, index: number}) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : undefined}
              />
            )}
          </PaginatedResourceSection>

          <Analytics.CollectionView
            data={{
              collection: {
                id: collection.id,
                handle: collection.handle,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    description
    productType
    tags
    createdAt
    variants(first: 3) {
      nodes {
        id
        title
        availableForSale
        price {
          ...MoneyProductItem
        }
        compareAtPrice {
          ...MoneyProductItem
        }
        selectedOptions {
          name
          value
        }
      }
    }
    metafields(identifiers: [{namespace: "custom", key: "short_description"}]) {
      id
      namespace
      key
      value
    }
    sellingPlanGroups(first: 1) {
      nodes {
        sellingPlans(first: 1) {
          nodes {
            id
            name
          }
        }
      }
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;