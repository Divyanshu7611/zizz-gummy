// import { useState } from 'react';
// import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
// import { useLoaderData, type MetaFunction } from '@remix-run/react';
// import ProductBenefits from '~/components/Product/ProductBenefits';
// import ProductSection from '~/components/Hero/ProductSection';
// import { Image } from '@shopify/hydrogen';
// import {
//   getSelectedProductOptions,
//   Analytics,
//   useOptimisticVariant,
//   getProductOptions,
//   getAdjacentAndFirstAvailableVariants,
//   useSelectedOptionInUrlParam,
// } from '@shopify/hydrogen';
// import { ProductPrice } from '~/components/ProductPrice';
// import { ProductImage } from '~/components/ProductImage';
// import { ProductForm } from '~/components/ProductForm';
// import { redirectIfHandleIsLocalized } from '~/lib/redirect';
// import ProductCarousel from '~/components/Product/ProductCarousel';
// import { FaQ, FaStar } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import Button from '~/components/mini/Button';
// import TestimonialSlider from '~/components/Product/ProductTestimonialSlider';
// import FAQ from '~/components/Product/Faqs';

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   return [
//     { title: `Hydrogen | ${data?.product.title ?? ''}` },
//     {
//       rel: 'canonical',
//       href: `/products/${data?.product.handle}`,
//     },
//   ];
// };

// export async function loader(args: LoaderFunctionArgs) {
//   // Start fetching non-critical data without blocking time to first byte
//   const deferredData = loadDeferredData(args);

//   // Await the critical data required to render initial state of the page
//   const criticalData = await loadCriticalData(args);

//   return { ...deferredData, ...criticalData };
// }

// /**
//  * Load data necessary for rendering content above the fold. This is the critical data
//  * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
//  */
// async function loadCriticalData({
//   context,
//   params,
//   request,
// }: LoaderFunctionArgs) {
//   const { handle } = params;
//   const { storefront } = context;

//   if (!handle) {
//     throw new Error('Expected product handle to be defined');
//   }

//   const [{ product }] = await Promise.all([
//     storefront.query(PRODUCT_QUERY, {
//       variables: { handle, selectedOptions: getSelectedProductOptions(request) },
//     }),
//     // Add other queries here, so that they are loaded in parallel
//   ]);

//   if (!product?.id) {
//     throw new Response(null, { status: 404 });
//   }




//   // The API handle might be localized, so redirect to the localized handle
//   redirectIfHandleIsLocalized(request, { handle, data: product });

//   return {
//     product,
//   };
// }

// /**
//  * Load data for rendering content below the fold. This data is deferred and will be
//  * fetched after the initial page load. If it's unavailable, the page should still 200.
//  * Make sure to not throw any errors here, as it will cause the page to 500.
//  */
// function loadDeferredData({ context, params }: LoaderFunctionArgs) {
//   // Put any API calls that is not critical to be available on first page render
//   // For example: product reviews, product recommendations, social feeds.

//   return {};
// }

// export default function Product() {
//   const { product } = useLoaderData<typeof loader>();
//   const [counter, setCounter] = useState<number>(1)

//   // Optimistically selects a variant with given available variant information
//   const selectedVariant = useOptimisticVariant(
//     product.selectedOrFirstAvailableVariant,
//     getAdjacentAndFirstAvailableVariants(product),
//   );



//   // Sets the search param to the selected variant without navigation
//   // only when no search params are set in the url
//   useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

//   // Get the product options array
//   const productOptions = getProductOptions({
//     ...product,
//     selectedOrFirstAvailableVariant: selectedVariant,
//   });

//   const { title, descriptionHtml } = product;
//   console.log('This is Product Data', selectedVariant);
//   console.log('Product Media:', product.media);

//   const medias = product.media.edges.map(({ node }: any) => ({
//     url: node.image?.url || node.previewImage?.url,
//     alt: node.alt || 'Product Image',
//   }));

//   console.log('Media Images', medias)

//   return (
//     <div>
//       {/* product Desc section */}
//       <div className='flex flex-col md:flex-row gap-10 justify-between max-w-screen-xl mx-auto py-5'>
//         <div className="w-full md:w-1/2">
//           <ProductCarousel images={medias} />
//         </div>

//         <div className="w-full md:w-1/2 flex flex-col justify-between gap-6 px-4 md:px-0 py-2">
//           {/* Title */}
//           <h1 className="inter font-bold text-3xl md:text-4xl text-black">{title}</h1>

//           {/* Description */}
//           <div
//             className="inter font-normal text-lg md:text-2xl"
//             dangerouslySetInnerHTML={{ __html: descriptionHtml }}
//           />

//           {/* Tagline */}
//           <h2 className="font-bold text-lg md:text-xl">For Both Men and Women</h2>

//           {/* Price & Ratings */}
//           <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//             <ProductPrice
//               price={selectedVariant?.price}
//               compareAtPrice={selectedVariant?.compareAtPrice}
//             />
//             <div className="flex items-center gap-1 inter text-sm md:text-base">
//               <FaStar className="text-[#FFCC00] text-lg" />
//               <span className="font-semibold">4.5/5 (50+ Reviews)</span>
//             </div>
//           </div>

//           {/* Color Pack Section */}
//           <div className="flex flex-col mt-6">
//             <h3 className="text-lg md:text-xl font-bold inter">Pick your pack:</h3>
//             <div className="flex flex-wrap justify-start gap-4 mt-3">
//               <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
//               <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
//               <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
//               <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
//             </div>
//           </div>

//           {/* Quantity & Add to Cart */}
//           <div className="flex flex-col sm:flex-row mt-6 gap-3">
//             <div className="flex items-center justify-between bg-[#1F1F1F] text-white px-4 py-2 text-lg rounded-sm w-full sm:w-1/3">
//               <button><IoIosArrowBack /></button>
//               <span>{counter}</span>
//               <button><IoIosArrowForward /></button>
//             </div>
//             <button className="bg-[#6D9773] text-white px-4 py-2 rounded-sm w-full sm:w-2/3 font-bold inter">
//               ADD TO CART
//             </button>
//           </div>

//           {/* Buy Now */}
//           <div className="w-full">
//             <button className="bg-[#6D9773] text-white px-4 py-2 rounded-sm w-full font-bold inter">
//               BUY NOW
//             </button>
//           </div>
//         </div>

//       </div>
//       <Analytics.ProductView
//         data={{
//           products: [
//             {
//               id: product.id,
//               title: product.title,
//               price: selectedVariant?.price.amount || '0',
//               vendor: product.vendor,
//               variantId: selectedVariant?.id || '',
//               variantTitle: selectedVariant?.title || '',
//               quantity: 1,
//             },
//           ],
//         }}
//       />


//       <div className='bg-[#FAFAFA]'>
//       {/* Product Benefits & Ingredients */}
//       <ProductBenefits/>
//       <Image src='/static/ProductPageDesc.png' alt='gummy showcase' className='h-[200px] md:h-[600px]'/>
//       <TestimonialSlider/>
//       </div> 
//       <ProductSection/>
//       <FAQ/>

//     </div>
//   );
// }


// const MEDIA_FIELDS_FRAGMENT = `#graphql
//   fragment MediaFields on Media {
//     mediaContentType
//     alt
//     previewImage {
//       url
//       altText
//     }
//     ... on MediaImage {
//       image {
//         url
//         altText
//         width
//         height
//       }
//     }
//     ... on Video {
//       sources {
//         url
//         mimeType
//         format
//         height
//         width
//       }
//     }
//     ... on Model3d {
//       sources {
//         url
//         mimeType
//         format
//         filesize
//       }
//     }
//     ... on ExternalVideo {
//       embeddedUrl
//       host
//     }
//   }
// ` as const;

// const PRODUCT_VARIANT_FRAGMENT = `#graphql
//   fragment ProductVariant on ProductVariant {
//     availableForSale
//     compareAtPrice {
//       amount
//       currencyCode
//     }
//     id
//     image {
//       __typename
//       id
//       url
//       altText
//       width
//       height
//     }
//     price {
//       amount
//       currencyCode
//     }
//     product {
//       title
//       handle
//     }

    
      
//     selectedOptions {
//       name
//       value
//     }
//     sku

//     title
//     unitPrice {
//       amount
//       currencyCode
//     }
//   }
// ` as const;

// const PRODUCT_FRAGMENT = `#graphql
//   fragment Product on Product {
//     id
//     title
//     vendor
//     handle
//     descriptionHtml
//     description
//     encodedVariantExistence
//     encodedVariantAvailability
//      media(first: 10) {
//     edges {
//       node {
//         ...MediaFields
//       }
//     }
//   }
//     options {
//       name
//       optionValues {
//         name
//         firstSelectableVariant {
//           ...ProductVariant
//         }
//         swatch {
//           color
//           image {
//             previewImage {
//               url
//             }
//           }
//         }
//       }
//     }
//     selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
//       ...ProductVariant
//     }
//     adjacentVariants (selectedOptions: $selectedOptions) {
//       ...ProductVariant
//     }
//     seo {
//       description
//       title
//     }
//   }
//   ${PRODUCT_VARIANT_FRAGMENT}
// ` as const;

// const PRODUCT_QUERY = `#graphql
//   query Product(
//     $country: CountryCode
//     $handle: String!
//     $language: LanguageCode
//     $selectedOptions: [SelectedOptionInput!]!
//   ) @inContext(country: $country, language: $language) {
//     product(handle: $handle) {
//       ...Product
//     }
//   }
//   ${PRODUCT_FRAGMENT}
//   ${MEDIA_FIELDS_FRAGMENT} 
// ` as const;



import { useState } from 'react';
import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction, Form, useFetcher } from '@remix-run/react';
import ProductBenefits from '~/components/Product/ProductBenefits';
import ProductSection from '~/components/Hero/ProductSection';
import { Image, CartForm } from '@shopify/hydrogen';
import { toast } from 'sonner';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import ProductCarousel from '~/components/Product/ProductCarousel';
import { FaQ, FaStar } from 'react-icons/fa6';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Button from '~/components/mini/Button';
import TestimonialSlider from '~/components/Product/ProductTestimonialSlider';
import FAQ from '~/components/Product/Faqs';
import type { ProductFragment, ProductVariantFragment } from 'storefrontapi.generated';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `Zizz Gummy | ${data?.product.title ?? ''}` },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, params, request }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return { product };
}

function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  return {};
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>();
  const [counter, setCounter] = useState<number>(1);
  const fetcher = useFetcher();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;

  const medias = product.media.edges.map(({ node }: any) => ({
    url: node.image?.url || node.previewImage?.url,
    alt: node.alt || 'Product Image',
  }));

  const sellingPlan = product.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0];

  const incrementCounter = () => setCounter((prev) => prev + 1);
  const decrementCounter = () => setCounter((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuyNow = async () => {
    await fetcher.submit(
      {
        [CartForm.INPUT_NAME]: JSON.stringify({
          action: CartForm.ACTIONS.LinesAdd,
          inputs: {
            lines: [
              {
                merchandiseId: selectedVariant.id,
                quantity: counter,
                ...(sellingPlan && { sellingPlanId: sellingPlan.id }),
              },
            ],
          },
        }),
      },
      { method: 'POST', action: '/cart' },
    );
    window.location.href = '/cart/checkout';
  };

  console.log('Selected Variant:', JSON.stringify(selectedVariant, null, 2));
  console.log('Fetcher State:', fetcher.state);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-10 gap-5 justify-between max-w-screen-xl mx-auto py-5 px-5">
        <div className='flex flex-col'>

        <h1 className="inter font-bold text-xl md:text-4xl text-black md:hidden block">{title}</h1>
          <div
            className="inter font-normal text-sm md:text-2xl md:hidden block"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <ProductCarousel images={medias} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between gap-6 md:px-0 py-2">
          <h1 className="inter font-bold text-3xl md:text-4xl text-black md:block hidden">{title}</h1>
          <div
            className="inter font-normal text-lg md:text-2xl hidden md:block"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <h2 className="font-bold text-sm md:text-xl">For Both Men and Women</h2>
          <div className="md:mt-5 mt-0 flex justify-between items-start sm:items-center gap-3">
            <ProductPrice
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
            />
            <div className="flex items-center gap-1 inter text-sm md:text-base">
              <FaStar className="text-[#FFCC00] text-lg" />
              <span className="md:font-semibold font-medium text-xs md:text-lg">4.5/5 (50+ Reviews)</span>
            </div>
          </div>
          <div className="flex flex-col md:mt-6 mt-1">
            <h3 className="text-sm md:text-xl md:font-bold font-semibold inter">Pick your pack:</h3>
            <ProductForm productOptions={productOptions} selectedVariant={selectedVariant} />
          </div>
          <div className="flex mt-6 gap-3 items-center">
            <div className="flex items-center justify-between bg-[#1F1F1F] text-white md:px-4 py-1.5 px-2 text-xl font-bold rounded-sm w-2/3 md:w-1/3">
              <button onClick={decrementCounter} aria-label="Decrease quantity" className='cursor-pointer'>
                <IoIosArrowBack />
              </button>
              <span>{counter}</span>
              <button onClick={incrementCounter} aria-label="Increase quantity" className='cursor-pointer'>
                <IoIosArrowForward />
              </button>
            </div>

            <div className='w-full'>
            {selectedVariant?.availableForSale ? (
              <fetcher.Form method="post" action="/cart">
                <input
                  type="hidden"
                  name={CartForm.INPUT_NAME}
                  value={JSON.stringify({
                    action: CartForm.ACTIONS.LinesAdd,
                    inputs: {
                      lines: [
                        {
                          merchandiseId: selectedVariant.id,
                          quantity: counter,
                          ...(sellingPlan && { sellingPlanId: sellingPlan.id }),
                        },
                      ],
                    },
                  })}
                />
                <button
                  type="submit"
                  className="bg-[#6D9773] text-white px-4 py-2 rounded-sm w-full flex items-center justify-center font-bold inter disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer hover:bg-[#5B7F5F] transition-colors duration-150"
                  disabled={fetcher.state !== 'idle'}
                  onClick={()=>toast.success('Added to Cart')}
                >
                  {fetcher.state === 'submitting' ? <span className='loader w-full h-full'></span> : 'ADD TO CART'}
                </button>
              </fetcher.Form>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-sm w-full sm:w-2/3 font-bold inter cursor-not-allowed"
                disabled
              >
                SOLD OUT
              </button>
            )}

            </div>
          </div>
          <div className="w-full">
            {selectedVariant?.availableForSale ? (
              <button
                onClick={handleBuyNow}
                className="bg-[#6D9773] disabled:bg-gray-400 text-white px-4 py-2 rounded-sm flex justify-center items-center w-full font-bold inter hover:bg-[#5B7F5F] transition-colors duration-150 cursor-pointer"
                disabled={fetcher.state !== 'idle'}
              >
                {fetcher.state === 'submitting' ? <span className='loader'></span> : 'BUY NOW'}
              </button>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-sm w-full font-bold inter cursor-not-allowed"
                disabled
              >
                SOLD OUT
              </button>
            )}
          </div>
        </div>
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: counter,
            },
          ],
        }}
      />
      <div className="bg-[#FAFAFA]">
        <ProductBenefits />
        <Image src="/static/ProductPageDesc.png" alt="gummy showcase" className="h-[200px] md:h-[600px]" />
        <TestimonialSlider />
      </div>
      <ProductSection />
      <FAQ />
    </div>
  );
}



const MEDIA_FIELDS_FRAGMENT = `#graphql
  fragment MediaFields on Media {
    mediaContentType
    alt
    previewImage {
      url
      altText
    }
    ... on MediaImage {
      image {
        url
        altText
        width
        height
      }
    }
    ... on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
    ... on Model3d {
      sources {
        url
        mimeType
        format
        filesize
      }
    }
    ... on ExternalVideo {
      embeddedUrl
      host
    }
  }
` as const;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    media(first: 10) {
      edges {
        node {
          ...MediaFields
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
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
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
  ${MEDIA_FIELDS_FRAGMENT}
` as const;

// export default PRODUCT_QUERY;
