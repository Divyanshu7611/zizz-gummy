import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import { useState } from 'react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import ProductCarousel from '~/components/Product/ProductCarousel';
import { FaStar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Button from '~/components/mini/Button';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }
  



  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  const [counter,setCounter] = useState<number>(1)

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );



  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;
  console.log('This is Product Data', selectedVariant);
     console.log('Product Media:', product.media);

  const medias = product.media.edges.map(({ node }:any) => ({
  url: node.image?.url || node.previewImage?.url,
  alt: node.alt || 'Product Image',
}));

console.log('Media Images',medias)

  return (
    // <div className="product">
    //   <ProductImage image={selectedVariant?.image} />
      // <div className="product-main">
      //   <h1>{title}</h1>
      //   <ProductPrice
      //     price={selectedVariant?.price}
      //     compareAtPrice={selectedVariant?.compareAtPrice}
      //   />
      //   <br />
      //   <ProductForm
      //     productOptions={productOptions}
      //     selectedVariant={selectedVariant}
      //   />
      //   <br />
      //   <br />
      //   <p>
      //     <strong>Description</strong>
      //   </p>
      //   <br />
      //   <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      //   <br />
      // </div>
    //   <Analytics.ProductView
    //     data={{
    //       products: [
    //         {
    //           id: product.id,
    //           title: product.title,
    //           price: selectedVariant?.price.amount || '0',
    //           vendor: product.vendor,
    //           variantId: selectedVariant?.id || '',
    //           variantTitle: selectedVariant?.title || '',
    //           quantity: 1,
    //         },
    //       ],
    //     }}
    //   />
    // </div>
    <div>
        {/* product Desc section */}
         <div className='flex flex-col md:flex-row gap-10 justify-between max-w-screen-xl mx-auto py-5'>
          <div className="w-full md:w-1/2">
    <ProductCarousel images={medias} />
  </div>
               {/* <div className="product-main">
        <h1>{title}</h1>
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
        <br />
        <ProductForm
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        />
        <br />
        <br />
        <p>
          <strong>Description</strong>
        </p>
        <br />
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
        <br />
      </div> */}
     <div className="w-full md:w-1/2 flex flex-col justify-between gap-6 px-4 md:px-0">
  {/* Title */}
  <h1 className="inter font-bold text-3xl md:text-4xl text-black">{title}</h1>

  {/* Description */}
  <div
    className="inter font-normal text-lg md:text-2xl mt-2"
    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
  />

  {/* Tagline */}
  <h2 className="font-bold text-lg md:text-xl mt-5">For Both Men and Women</h2>

  {/* Price & Ratings */}
  <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
    <ProductPrice
      price={selectedVariant?.price}
      compareAtPrice={selectedVariant?.compareAtPrice}
    />
    <div className="flex items-center gap-1 inter text-sm md:text-base">
      <FaStar className="text-[#FFCC00] text-lg" />
      <span className="font-semibold">4.5/5 (50+ Reviews)</span>
    </div>
  </div>

  {/* Color Pack Section */}
  <div className="flex flex-col mt-6">
    <h3 className="text-lg md:text-xl font-bold inter">Pick your pack:</h3>
    <div className="flex flex-wrap justify-start gap-4 mt-3">
      <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
      <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
      <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
      <div className="bg-[#F8F4EC] rounded-lg w-20 h-20 md:w-24 md:h-24"></div>
    </div>
  </div>

  {/* Quantity & Add to Cart */}
  <div className="flex flex-col sm:flex-row mt-6 gap-3">
    <div className="flex items-center justify-between bg-[#1F1F1F] text-white px-4 py-2 text-lg rounded-sm w-full sm:w-1/3">
      <button><IoIosArrowBack /></button>
      <span>{counter}</span>
      <button><IoIosArrowForward /></button>
    </div>
    <button className="bg-[#6D9773] text-white px-4 py-2 rounded-sm w-full sm:w-2/3 font-bold inter">
      ADD TO CART
    </button>
  </div>

  {/* Buy Now */}
  <div className="w-full mt-3">
    <button className="bg-[#6D9773] text-white px-4 py-2 rounded-sm w-full font-bold inter">
      BUY NOW
    </button>
  </div>
</div>

         </div>
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
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
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
