// import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
// import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
// import { BsArrowUpRightCircle } from "react-icons/bs";
// import {Suspense} from 'react';
// import {Image, Money} from '@shopify/hydrogen';
// import Hero from '~/components/Hero/Hero';
// import Button from '~/components/mini/Button';
// import BriefCards from '~/components/Hero/BriefCards';
// import GummyDesc from '~/components/Hero/GummyDesc';
// import GummyProductSection from '~/components/Hero/ProductSection';
// import TestimonialSlider from '~/components/Hero/TestimonialSlider';
// import type {
//   FeaturedCollectionFragment,
//   RecommendedProductsQuery,
// } from 'storefrontapi.generated';
// import {ProductItem} from '~/components/ProductItem';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';

// export const meta: MetaFunction = () => {
//   return [{title: 'Hydrogen | Home'}];
// };

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
// async function loadCriticalData({context}: LoaderFunctionArgs) {
//   const [{collections}] = await Promise.all([
//     context.storefront.query(FEATURED_COLLECTION_QUERY),
//     // Add other queries here, so that they are loaded in parallel
//   ]);

//   return {
//     featuredCollection: collections.nodes[0],
//   };
// }

// /**
//  * Load data for rendering content below the fold. This data is deferred and will be
//  * fetched after the initial page load. If it's unavailable, the page should still 200.
//  * Make sure to not throw any errors here, as it will cause the page to 500.
//  */
// function loadDeferredData({context}: LoaderFunctionArgs) {
//   const recommendedProducts = context.storefront
//     .query(RECOMMENDED_PRODUCTS_QUERY)
//     .catch((error) => {
//       // Log query errors, but don't throw them so the page can still render
//       console.error(error);
//       return null;
//     });

//   return {
//     recommendedProducts,
//   };
// }

// export default function Homepage() {
//   const data = useLoaderData<typeof loader>();
//   return (
//     <>
//     <div className='min-h-screen max-w-[1440px] mx-auto'>
//       <Hero/>
//       <BriefCards/>
//       {/* <FeaturedCollection collection={data.featuredCollection} /> */}
//       <RecommendedProducts products={data.recommendedProducts} /> 
//       <GummyDesc/>
//       <GummyProductSection/>
//       <div className='w-full mt-10'>
//         <Image src='/static/coolway.png' alt='Cool Way Image'/>
//       </div>
//       <TestimonialSlider/>
//     </div>
//     </>
//   );
// }

// function FeaturedCollection({
//   collection,
// }: {
//   collection: FeaturedCollectionFragment;
// }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//       {/* <p>{collection.}</p> */}
//     </Link>
//   );
// }

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery | null>;
// }) {
//   return (
//     // <div className="recommended-products">
//     //   <div className='flex items-center justify-between w-full my-10'>
//     //   <h3 className='text-[#1F1F1F] text-4xl font-bold'>Explore Our Gummies</h3>
//     //   <Button text='Learn More' bgColor='bg-[#1E1E1E]' icon={<BsArrowUpRightCircle/>}/> 
//     //   </div>
//     //   <Suspense fallback={<div>Loading...</div>}>
//     //     <Await resolve={products}>

//     //       {(response) => (
//     //         <div className="recommended-products-grid">
//     //           {response
//     //             ? response.products.nodes.map((product) => (
//     //                 <ProductItem key={product.id} product={product} /> 
//     //               ))  
//     //             : null}
//     //         </div>
//     //       )}
//     //     </Await>
//     //   </Suspense>
//     //   <br />
//     // </div>
//       <div className="recommended-products px-2 py-8">
//       {/* Header section */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-6">
//         <h3 className="text-[#1F1F1F] text-2xl sm:text-3xl lg:text-4xl font-bold">
//           Explore Our Gummies
//         </h3>
//         <Button
//           text="Learn More"
//           bgColor="bg-[#1E1E1E]"
//           icon={<BsArrowUpRightCircle />}
//         />
//       </div>

//       {/* Product Grid / Slider */}
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) =>
//             response ? (
//               <div>
//                 {/* Swiper slider for mobile */}
//                 <div className="block md:hidden">
//                   <Swiper
//                     spaceBetween={16}
//                     slidesPerView={1}
//                     autoplay={{ delay: 2500, disableOnInteraction: false }}
//                     modules={[Autoplay]}
//                     grabCursor={true}
//                   >
//                     {response.products.nodes.map((product) => (
//                       <SwiperSlide key={product.id}>
//                         <ProductItem product={product} />
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
//                 </div>

//                 {/* Grid for md+ */}
//                 <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 justify-between xl:grid-cols-4 gap-6">
//                   {response.products.nodes.map((product) => (
//                     <ProductItem key={product.id} product={product} />
//                   ))}
//                 </div>
//               </div>
//             ) : null
//           }
//         </Await>
//       </Suspense>
//     </div>
//   );
// }



// const FEATURED_COLLECTION_QUERY = `#graphql
//   fragment FeaturedCollection on Collection {
//     id
//     title
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query FeaturedCollection($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...FeaturedCollection
//       }
//     }
//   }
// ` as const;

// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     tags
//     productType
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     featuredImage {
//       id
//       url
//       altText
//       width
//       height
//     }
//       variants(first: 3) {
//       nodes {
//         id
//         title
//         availableForSale
//         price {
//           ...MoneyRecommendedProduct
//         }
//         compareAtPrice {
//           ...MoneyRecommendedProduct
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
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// ` as const;






import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import Hero from '~/components/Hero/Hero';
import Button from '~/components/mini/Button';
import BriefCards from '~/components/Hero/BriefCards';
import GummyDesc from '~/components/Hero/GummyDesc';
import GummyProductSection from '~/components/Hero/ProductSection';
import TestimonialSlider from '~/components/Hero/TestimonialSlider';
import type { FeaturedCollectionFragment, RecommendedProductsQuery } from 'storefrontapi.generated';
import { ProductItem } from '~/components/ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export const meta: MetaFunction = () => {
  return [{ title: 'Zizz Gummy | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);
  return {
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error('Recommended Products Query Error:', error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen mx-auto">
      <Hero />
      <BriefCards />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <RecommendedProducts products={data.recommendedProducts} />
      <GummyDesc />
      <GummyProductSection />
      <div className="w-full mt-10">
        <Image src="/static/coolway.png" alt="Cool Way Image" />
      </div>
      <TestimonialSlider />
    </div>
  );
}

// function FeaturedCollection({ collection }: { collection: FeaturedCollectionFragment }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link className="featured-collection" to={`/collections/${collection.handle}`}>
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

function RecommendedProducts({ products }: { products: Promise<RecommendedProductsQuery | null> }) {
  return (
    <div className="recommended-products px-2 py-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-6">
        <h3 className="text-[#1F1F1F] text-2xl sm:text-3xl lg:text-4xl font-bold">
          Explore Our Gummies
        </h3>
        <Button text="Learn More" bgColor="bg-[#1E1E1E]" icon={<BsArrowUpRightCircle />} />
      </div>

      <Suspense fallback={<div className="text-center text-lg">Loading...</div>}>
        <Await resolve={products}>
          {(response) => {
            console.log('Recommended Products Response:', JSON.stringify(response, null, 2));
            if (!response || !response.products?.nodes?.length) {
              return (
                <div className="text-center text-lg text-gray-600">
                  No recommended products available.
                </div>
              );
            }
            return (
              <div>
                <div className="block md:hidden">
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    grabCursor={true}
                  >
                    {response.products.nodes.map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductItem product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment MoneyRecommendedProduct on MoneyV2 {
    amount
    currencyCode
  }
  fragment RecommendedProduct on Product {
    id
    title
    handle
    productType
    tags
    priceRange {
      minVariantPrice {
        ...MoneyRecommendedProduct
      }
      maxVariantPrice {
        ...MoneyRecommendedProduct
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 3) {
      nodes {
        id
        title
        availableForSale
        price {
          ...MoneyRecommendedProduct
        }
        compareAtPrice {
          ...MoneyRecommendedProduct
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
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
