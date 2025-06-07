import React, {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {Await, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

import AboutHeader from '~/components/about/AboutHeader';
import WhatIsZizz from '~/components/about/WhatIsZizz';
import VisionAndMission from '~/components/about/VisionAndMission';
import WhyZizzExist from '~/components/about/WhyZizzExist';
import RecommendedProducts from '~/components/about/RecommendedProducts';

export async function loader({context}: LoaderFunctionArgs) {
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

export default function AboutPage() {
  const {recommendedProducts} = useLoaderData<typeof loader>();

  return (
    <>
      <AboutHeader />
      <WhatIsZizz />
      <VisionAndMission />
      <WhyZizzExist />
      <Image src="/static/AboutPageDesc.png" alt="Gummy About Description" className='md:h-[520px] h-[200px]'/>
      <Suspense fallback={<div>Loading recommended products...</div>}>
        <Await resolve={recommendedProducts}>
          {(response) => (
            <RecommendedProducts products={response?.products?.nodes || []} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment MoneyRecommendedProduct on MoneyV2 {
    amount
    currencyCode
  }
  fragment RecommendedProduct on Product {
    id
    title
    description
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
    metafields(identifiers: [{ namespace: "custom", key: "short_description" }]) {
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

  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
