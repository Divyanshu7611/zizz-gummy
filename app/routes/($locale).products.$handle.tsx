import { useState, useMemo, useEffect } from 'react';
import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction, useFetcher, Scripts } from '@remix-run/react';
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
  const { storefront, env } = context;

  if (!handle) throw new Error('Product handle missing');

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions: getSelectedProductOptions(request),
    },
  });

  if (!product?.id) throw new Response(null, { status: 404 });

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return { 
    product,
    storeDomain: env.PUBLIC_STORE_DOMAIN,
  };
}

export default function Product() {
  const { product, storeDomain } = useLoaderData<typeof loader>();
  const [counter, setCounter] = useState(1);
  const [descriptionSections, setDescriptionSections] = useState<{ [key: string]: string }>({ 'Product Info': product.descriptionHtml || '' });
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Extract numeric product ID from Shopify GID for Judge.me
  const getNumericProductId = (gid: string): string => {
    // Shopify GID format: "gid://shopify/Product/123456789"
    const match = gid.match(/\/(\d+)$/);
    return match ? match[1] : gid;
  };

  const productNumericId = getNumericProductId(product.id);

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
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const parseDescription = (html: string) => {
      if (!html) return { 'Product Info': '' };
      
      const sections: { [key: string]: string } = {};
      
      // Client-side parsing with DOM
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      const elements = Array.from(tempDiv.children);
      let currentSection = 'Product Info';
      let currentContent: string[] = [];
      
      elements.forEach((element) => {
        const tagName = element.tagName.toLowerCase();
        const text = element.textContent?.trim() || '';
        const innerHTML = element.innerHTML.trim();
        
        // Check if element is a heading
        // Headings can be: h1-h6, or p/div with strong containing short text
        const isHeadingTag = /^h[1-6]$/.test(tagName);
        
        // Check if it's a paragraph/div with only a strong tag (likely a heading)
        const strongElement = element.querySelector('strong');
        const hasOnlyStrong = strongElement && 
          element.children.length === 1 && 
          strongElement.tagName.toLowerCase() === 'strong' &&
          strongElement.textContent?.trim() === text;
        
        // Check for common heading patterns
        const isShortText = text.length > 0 && text.length < 200;
        const hasQuestionMark = text.includes('?');
        const commonHeadingPatterns = /^(Why|How|Who|What|Power|Safety|Stronger|Key Ingredients)/i;
        const matchesHeadingPattern = commonHeadingPatterns.test(text);
        
        // Determine if this is a heading
        const isHeading = isHeadingTag || 
          (hasOnlyStrong && isShortText) ||
          (tagName === 'p' && hasOnlyStrong && isShortText && !element.querySelector('ul') && !element.querySelector('li')) ||
          (isShortText && (hasQuestionMark || matchesHeadingPattern) && !element.querySelector('ul') && !element.querySelector('li'));
        
        if (isHeading && text) {
          // Save previous section if it has content
          if (currentContent.length > 0) {
            sections[currentSection] = currentContent.join('');
          }
          
          // Start new section with cleaned heading text
          currentSection = text
            .replace(/\*\*/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();
          
          currentContent = [];
        } else if (text || innerHTML) {
          // Regular content - add to current section
          currentContent.push(element.outerHTML);
        }
      });
      
      // Save last section
      if (currentContent.length > 0) {
        sections[currentSection] = currentContent.join('');
      }
      
      // If no sections were created, return everything as "Product Info"
      if (Object.keys(sections).length === 0) {
        return { 'Product Info': html };
      }
      
      // Reorder sections: "Product Info" first, then all other sections in their original order
      const orderedSections: { [key: string]: string } = {};
      const productInfoKey = Object.keys(sections).find(key => 
        /Product Info/i.test(key)
      );
      
      // Add "Product Info" first if it exists
      if (productInfoKey) {
        orderedSections[productInfoKey] = sections[productInfoKey];
      }
      
      // Add all other sections in their original order
      Object.keys(sections).forEach(key => {
        if (key !== productInfoKey) {
          orderedSections[key] = sections[key];
        }
      });
      
      return orderedSections;
    };

    const parsed = parseDescription(product.descriptionHtml);
    setDescriptionSections(parsed);
    
    // Set the first section as open by default
    const firstSectionKey = Object.keys(parsed)[0];
    if (firstSectionKey) {
      setOpenSection((prev) => prev === null ? firstSectionKey : prev);
    }
  }, [product.descriptionHtml]);

  // Load Judge.me reviews script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if script tag already exists
    const existingScript = document.getElementById('judgeme_product_reviews_script');
    if (existingScript) {
      // Script already loaded, trigger widget reload
      if ((window as any).judgeme && (window as any).judgeme.reloadWidget) {
        setTimeout(() => {
          (window as any).judgeme.reloadWidget();
        }, 100);
      }
      return;
    }

    // Construct Judge.me script URL
    // Option 1: Use store domain to construct URL (if storeDomain is available)
    // Option 2: Use the script URL from Judge.me app settings (recommended)
    // You can find your Judge.me script URL in: Judge.me App → Settings → Installation → Script Tag
    let scriptUrl = 'https://cdn.judge.me/widget.js';
    
    // Try to construct from store domain if available
    if (storeDomain) {
      // Remove protocol and get just the domain
      const domain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
      scriptUrl = `https://judge.me/shopify/init.js?shop=${domain}`;
    }

    const script = document.createElement('script');
    script.id = 'judgeme_product_reviews_script';
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      // Wait for Judge.me to initialize
      const checkJudgeMe = setInterval(() => {
        if ((window as any).judgeme) {
          clearInterval(checkJudgeMe);
          
          // Try multiple initialization methods
          if ((window as any).judgeme.init) {
            (window as any).judgeme.init();
          }
          
          // Try to load the widget for this product
          if ((window as any).judgeme.loadWidget) {
            (window as any).judgeme.loadWidget(`judgeme_product_reviews_${productNumericId}`);
          }
          
          // Also try reloadWidget
          if ((window as any).judgeme.reloadWidget) {
            setTimeout(() => {
              (window as any).judgeme.reloadWidget();
            }, 300);
          }
        }
      }, 100);
      
      // Clear interval after 5 seconds if Judge.me doesn't load
      setTimeout(() => clearInterval(checkJudgeMe), 5000);
    };
    script.onerror = () => {
      console.error('Failed to load Judge.me script. Please check your script URL in Judge.me app settings.');
      console.error('Expected format: https://judge.me/shopify/init.js?shop=YOUR_STORE.myshopify.com');
    };
    document.body.appendChild(script);
  }, [product.id, productNumericId, storeDomain]);

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
              variantTitle: selectedVariant.selectedOptions.map((o: { name: string; value: string }) => o.value).join(' / ') || 'Default',
              quantity: counter,
            },
          ],
        }}
      />

      {/* JUDGE.ME REVIEWS SECTION */}
      <div className="max-w-screen-xl mx-auto px-5 py-8">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F1F1F] mb-6">Customer Reviews</h2>
          <div 
            id={`judgeme_product_reviews_${productNumericId}`}
            className="jdgm-widget jdgm-rev-widget"
            data-id={productNumericId}
            data-product-id={productNumericId}
            data-auto-install="false"
          >
            {/* Judge.me widget will render here */}
          </div>
        </div>
      </div>

      {/* <div className="bg-[#FAFAFA]">
        <ProductBenefits />
        <Image
          src="/static/ProductPageDesc.png"
          alt="product showcase"
          className="h-[200px] md:h-[600px]"
        />
        <TestimonialSlider />
      </div> */}

      {/* <ProductSection /> */}
      {/* <FAQ /> */}
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
