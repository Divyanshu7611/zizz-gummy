import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {BsArrowUpRightCircle} from 'react-icons/bs';
import {Suspense} from 'react';
import {motion} from 'framer-motion';
import {Image, Money} from '@shopify/hydrogen';
import Hero from '~/components/Hero/Hero';
import Button from '~/components/mini/Button';
import BriefCards from '~/components/Hero/BriefCards';
import GummyDesc from '~/components/Hero/GummyDesc';
import GummyProductSection from '~/components/Hero/ProductSection';
import TestimonialSlider from '~/components/Hero/TestimonialSlider';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import React, { useRef, useEffect } from "react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';


interface RecommendedProductsProps {
  products: Promise<RecommendedProductsQuery | null>;
}

export const meta: MetaFunction = () => {
  return [{title: 'Zizz Gummy | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);
  return {
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
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
  // Animation variants for the container
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the image
  const imageVariants = {
    hidden: {opacity: 0, scale: 0.95},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen mx-auto">
      <Hero />
      {/* <BriefCards /> */}
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <RecommendedProducts products={data.recommendedProducts} />
      <GummyDesc />
      <GummyProductSection />
      <motion.div
        className="w-full mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={imageVariants}>
          <Image
            src="/static/coolway.png"
            alt="Cool Way Image"
            className="md:h-auto h-[175px]"
          />
        </motion.div>
      </motion.div>
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




const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
  // Ref for Swiper instance
  const swiperRef = useRef<SwiperType | null>(null);

  // Hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  // Ensure Swiper navigation updates after initialization
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation?.update();
    }
  }, []);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for product items
  const productVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for navigation buttons
  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="recommended-products px-3 py-8 max-w-[1440px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="flex items-start md:items-center justify-between gap-4 my-6 px-2"
        variants={itemVariants}
      >
        <motion.h3
          className="text-[#1F1F1F] text-xl md:text-3xl lg:text-4xl font-bold"
          variants={itemVariants}
        >
          Explore Our Gummies
        </motion.h3>
        <motion.div variants={itemVariants}>
          <Button
            text="View All"
            bgColor="bg-[#1E1E1E]"
            icon={<BsArrowUpRightCircle />}
            href='/collections/all'
          />
        </motion.div>
      </motion.div>
      <Suspense fallback={<div className="text-center text-lg">Loading...</div>}>
        <Await resolve={products}>
          {(response) => {
            console.log(
              "Recommended Products Response:",
              JSON.stringify(response, null, 2)
            );
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
                    slidesPerView={2}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    navigation={{
                      nextEl: ".custom-swiper-button-next",
                      prevEl: ".custom-swiper-button-prev",
                    }}
                    modules={[Autoplay, Navigation]}
                    grabCursor={true}
                    onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
                  >
                    {response.products.nodes.map((product,index) => {

                      return(<SwiperSlide key={product.id}>
                        <motion.div
                          variants={productVariants}
                          initial="hidden"
                          animate={inView ? "visible" : "hidden"}
                        >
                          <ProductItem product={product} index={index}/>
                        </motion.div>
                      </SwiperSlide>
                    )
                    }
                  )
                  }
                  </Swiper>
                  <motion.div
                    className="flex gap-4 mt-3 justify-start"
                    variants={itemVariants}
                  >
                    <motion.button
                      className="custom-swiper-button-prev bg-black text-white p-3 rounded-full border-2 border-white flex items-center justify-center w-10 h-10 z-50 hover:bg-gray-800 transition-colors"
                      variants={buttonVariants}
                      onClick={() => swiperRef.current?.slidePrev()}
                      aria-label="Previous product"
                    >
                      <FaArrowLeft size={20} />
                    </motion.button>
                    <motion.button
                      className="custom-swiper-button-next bg-black text-white p-3 rounded-full border-2 border-white flex items-center justify-center w-10 h-10 z-50 hover:bg-gray-800 transition-colors"
                      variants={buttonVariants}
                      onClick={() => swiperRef.current?.slideNext()}
                      aria-label="Next product"
                    >
                      <FaArrowRight size={20} />
                    </motion.button>
                  </motion.div>
                </div>
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {response.products.nodes.map((product,index) => (
                    <motion.div
                      key={product.id}
                      variants={productVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                    >
                      <ProductItem product={product} index={index}/>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </motion.div>
  );
};

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
    description
    descriptionHtml
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
