import { useState } from 'react';
import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction, useFetcher } from '@remix-run/react';
import { Image, CartForm } from '@shopify/hydrogen';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { toast } from 'sonner';

import ProductBenefits from '~/components/Product/ProductBenefits';
import ProductSection from '~/components/Hero/ProductSection';
import ProductCarousel from '~/components/Product/ProductCarousel';
import TestimonialSlider from '~/components/Product/ProductTestimonialSlider';
import FAQ from '~/components/Product/Faqs';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

import { FaStar } from 'react-icons/fa6';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { ShoppingCart, Truck, Package, Heart, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `Zizz Gummy | ${data?.product.title ?? ''}` },
  { rel: 'canonical', href: `/products/${data?.product.handle}` },
];

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}

async function loadCriticalData({ context, params, request }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) throw new Error('Product handle missing');

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions: getSelectedProductOptions(request),
    },
  });

  if (!product?.id) throw new Response(null, { status: 404 });

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return { product };
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>();
  const [counter, setCounter] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('Product Info');

  const addToCartFetcher = useFetcher();
  const buyNowFetcher = useFetcher();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const medias = product.media.edges.map(({ node }: any) => ({
    url: node.image?.url || node.previewImage?.url,
    alt: node.alt || 'Product Image',
  }));

  const sellingPlan =
    product.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0];

  // Redirect after Buy Now
  if (buyNowFetcher.state === 'idle' && buyNowFetcher.data) {
    window.location.href = '/cart';
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Parse description HTML into sections based on headings (client-side only)
  const parseDescription = (html: string) => {
    if (typeof window === 'undefined') {
      // Server-side: return full description as one section
      return { 'Product Info': html };
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const sections: { [key: string]: string } = {};
    
    let currentSection = 'Product Info';
    let currentContent: string[] = [];
    
    const elements = Array.from(doc.body.children);
    
    elements.forEach((element) => {
      const text = element.textContent?.trim() || '';
      const tagName = element.tagName.toLowerCase();
      
      // Check if it's a heading (strong tag or h1-h6 or p with strong inside)
      const hasStrongChild = element.querySelector('strong');
      const isHeading = tagName === 'strong' || tagName.match(/^h[1-6]$/) || (tagName === 'p' && hasStrongChild);
      
      if (isHeading && text && text.length < 100) {
        // Save previous section
        if (currentContent.length > 0) {
          sections[currentSection] = currentContent.join('');
        }
        // Start new section
        currentSection = text.replace(/\*\*/g, '').trim();
        currentContent = [];
      } else if (text) {
        currentContent.push(element.outerHTML);
      }
    });
    
    // Save last section
    if (currentContent.length > 0) {
      sections[currentSection] = currentContent.join('');
    }
    
    return sections;
  };

  const descriptionSections = parseDescription(product.descriptionHtml);

  return (
    <div>
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-screen-xl mx-auto px-5 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">

          {/* IMAGE SECTION - Full Height with Sticky */}
          <div className="w-full md:w-1/2">
            <div className="sticky top-4">
              <ProductCarousel images={medias} />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F1F1F]">
              {product.title}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#FFCC00] text-sm" />
                ))}
              </div>
              <span className="text-sm text-gray-600">9 Reviews</span>
            </div>

            {/* PRICE */}
            <div className="text-3xl font-bold text-[#1F1F1F]">
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
            </div>

            {/* DISCOUNT TAG */}
            {selectedVariant?.compareAtPrice && (
              <div className="text-[#4CAF50] text-sm font-medium cursor-pointer">
                ✓ Click To Apply A Discount
              </div>
            )}

            {/* QUANTITY + ADD TO CART */}
            <div className="flex gap-3 items-center mt-2">
              <div className="flex items-center justify-between bg-white border-2 border-gray-300 px-4 py-2 rounded-md w-32">
                <button
                  onClick={() => setCounter(Math.max(1, counter - 1))}
                  className="text-xl"
                >
                  −
                </button>
                <span className="font-semibold">{counter}</span>
                <button onClick={() => setCounter(counter + 1)} className="text-xl">
                  +
                </button>
              </div>

              <addToCartFetcher.Form
                method="post"
                action="/cart"
                className="flex-1"
              >
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
                          ...(sellingPlan && {
                            sellingPlanId: sellingPlan.id,
                          }),
                        },
                      ],
                    },
                  })}
                />
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 font-bold rounded-md transition-colors"
                  onClick={() => toast.success('Added to Cart')}
                  disabled={!selectedVariant?.availableForSale}
                >
                  {selectedVariant?.availableForSale ? 'ADD TO CART' : 'SOLD OUT'}
                </button>
              </addToCartFetcher.Form>
            </div>

            {/* BUY NOW */}
            <button
              onClick={() =>
                buyNowFetcher.submit(
                  {
                    [CartForm.INPUT_NAME]: JSON.stringify({
                      action: CartForm.ACTIONS.LinesAdd,
                      inputs: {
                        lines: [
                          {
                            merchandiseId: selectedVariant.id,
                            quantity: counter,
                            ...(sellingPlan && {
                              sellingPlanId: sellingPlan.id,
                            }),
                          },
                        ],
                      },
                    }),
                  },
                  { method: 'POST', action: '/cart' },
                )
              }
              className="w-full border-2 border-black text-black py-3 font-bold rounded-md hover:bg-black hover:text-white transition-colors"
              disabled={!selectedVariant?.availableForSale}
            >
              BUY IT NOW
            </button>

            {/* PACK OPTIONS */}
            <div className="mt-4">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>

            {/* DELIVERY TIMELINE */}
            <div className="flex items-center justify-between py-4 md:py-6 border-t border-b border-gray-200 mt-4">
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center text-white mb-1 md:mb-2">
                  <ShoppingCart size={14} className="md:w-5 md:h-5" />
                </div>
                <p className="text-[8px] md:text-xs font-semibold">Dec 28th</p>
                <p className="text-[7px] md:text-xs text-gray-500">Ordered</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-1 md:mx-2 max-w-[40px] md:max-w-none"></div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center text-white mb-1 md:mb-2">
                  <Truck size={14} className="md:w-5 md:h-5" />
                </div>
                <p className="text-[8px] md:text-xs font-semibold text-center">Dec 29th - 30th</p>
                <p className="text-[7px] md:text-xs text-gray-500">Order Ready</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-1 md:mx-2 max-w-[40px] md:max-w-none"></div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center text-white mb-1 md:mb-2">
                  <Package size={14} className="md:w-5 md:h-5" />
                </div>
                <p className="text-[8px] md:text-xs font-semibold text-center">Jan 7th - 9th</p>
                <p className="text-[7px] md:text-xs text-gray-500">Delivered</p>
              </div>
            </div>

            {/* COLLAPSIBLE SECTIONS - Dynamic from Description */}
            <div className="mt-6 space-y-3">
              {Object.entries(descriptionSections).map(([title, content], index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(title)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#4CAF50]">✓</span>
                      {title.toUpperCase()}
                    </span>
                    {openSection === title ? (
                      <ChevronUp size={20} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-600" />
                    )}
                  </button>
                  {openSection === title && (
                    <div
                      className="px-4 pb-4 text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* TRUST BADGES */}
            <div className="flex items-center justify-around py-6 mt-6 border-t border-gray-200">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                  <Heart size={24} className="text-red-500" />
                </div>
                <p className="text-xs font-semibold text-center">100k Customers</p>
                <p className="text-xs text-gray-500">Loved Us</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <RotateCcw size={24} className="text-blue-500" />
                </div>
                <p className="text-xs font-semibold text-center">Hassle-Free</p>
                <p className="text-xs text-gray-500">Returns</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-2">
                  <Truck size={24} className="text-green-500" />
                </div>
                <p className="text-xs font-semibold text-center">Free Shipping</p>
                <p className="text-xs text-gray-500">PAN India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BELOW SECTIONS ================= */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant.price.amount,
              vendor: product.vendor,
              variantId: selectedVariant.id,
              variantTitle: selectedVariant.selectedOptions.map(o => o.value).join(' / ') || 'Default',
              quantity: counter,
            },
          ],
        }}
      />

      <div className="bg-[#FAFAFA]">
        <ProductBenefits />
        <Image
          src="/static/ProductPageDesc.png"
          alt="product showcase"
          className="h-[200px] md:h-[600px]"
        />
        <TestimonialSlider />
      </div>

      <ProductSection />
      <FAQ />
    </div>
  );
}


/* ================= GRAPHQL ================= */

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      encodedVariantExistence
      encodedVariantAvailability
      media(first: 10) {
        edges {
          node {
            previewImage {
              url
            }
          }
        }
      }
      selectedOrFirstAvailableVariant(
        selectedOptions: $selectedOptions
      ) {
        id
        availableForSale
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
      adjacentVariants(selectedOptions: $selectedOptions) {
        id
        availableForSale
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
      }
      sellingPlanGroups(first: 1) {
        nodes {
          sellingPlans(first: 1) {
            nodes {
              id
            }
          }
        }
      }
      options {
        name
        optionValues {
          name
        }
      }
    }
  }
`;
