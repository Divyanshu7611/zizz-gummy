// import {Link} from '@remix-run/react';
// import {Image, Money} from '@shopify/hydrogen';
// import type {
//   ProductItemFragment,
//   CollectionItemFragment,
//   RecommendedProductFragment,
// } from 'storefrontapi.generated';
// import {useVariantUrl} from '~/lib/variants';

// export function ProductItem({
//   product,
//   loading,
// }: {
//   product:
//     | CollectionItemFragment
//     | ProductItemFragment
//     | RecommendedProductFragment;
//   loading?: 'eager' | 'lazy';
// }) {
//   const variantUrl = useVariantUrl(product.handle);
//   const image = product.featuredImage;

//   return (
//     <div className="product-item rounded shadow-sm space-y-2 bg-[#FAFAFA]">
//       <Link
//         key={product.id}
//         prefetch="intent"
//         to={variantUrl}
//         className="block bg-[#FAFAFA] drop-shadow-xl shadow-[#0000001A]"
//       >
//         {image && (
//           <Image
//             alt={image.altText || product.title}
//             aspectRatio="1/1"
//             data={image}
//             loading={loading} 
//             sizes="(min-width: 45em) 400px, 100vw"
//           />
//         )}
//         <div className='p-2'>

//         <h4 className="mt-2 text-[#1F1F1F] font-bold text-xl md:text-3xl">{product.title}</h4>
//         <small className="text-[#1E1E1E] text-2xl md:text-4xl font-semibold">
//           <Money data={product.priceRange.minVariantPrice} />
//         </small>
//         </div>
//       </Link>

//       {/* Add to Cart Button */}
//       <button
//         className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-all"
//         onClick={() => alert(`Add ${product.title} to cart`)} // replace with real function later
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }




// import { Link } from '@remix-run/react';
// import { Image, Money } from '@shopify/hydrogen';
// import { AddToCartButton } from './AddToCartButton';
// import type {
//   CollectionItemFragment,
//   ProductItemFragment,
//   RecommendedProductFragment,
// } from 'storefrontapi.generated';
// import { useVariantUrl } from '~/lib/variants';

// export function ProductItem({
//   product,
//   loading,
// }: {
//   product:
//     | CollectionItemFragment
//     | ProductItemFragment
//     | RecommendedProductFragment;
//   loading?: 'eager' | 'lazy';
// }) {
//   // Use the first variant for add-to-cart and pricing
//   const firstVariant = product?.variants?.nodes?.[0];
//   const image = product.featuredImage;
//   const variantUrl = useVariantUrl(product.handle);
  
//   // Get short description from metafields
//   const shortDescription = product.metafields?.find(
//     (m:any) => m?.namespace === 'custom' && m?.key === 'short_description'
//   )?.value;

//   // Check if the product is on sale (compareAtPrice > price)
//   const isOnSale = firstVariant?.compareAtPrice?.amount && 
//     Number(firstVariant.compareAtPrice.amount) > Number(firstVariant.price.amount);

//   // Get subscription plan if available
//   const sellingPlan = product.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0];

//   // Construct lines for AddToCartButton
//   const lines = firstVariant?.id
//     ? [{
//         merchandiseId: firstVariant.id,
//         quantity: 1,
//         ...(sellingPlan && { sellingPlanId: sellingPlan.id }), // Include if subscription exists
//       }]
//     : [];

//   return (
//     <div className="product-item rounded shadow-sm space-y-2 bg-[#FAFAFA] p-4">
//       <Link
//         key={product.id}
//         prefetch="intent"
//         to={variantUrl}
//         className="block bg-[#FAFAFA] drop-shadow-xl shadow-[#0000001A]"
//       >
//         {image && (
//           <Image
//             alt={image.altText || product.title}
//             aspectRatio="1/1"
//             data={image}
//             loading={loading}
//             sizes="(min-width: 45em) 400px, 100vw"
//             className="w-full object-cover"
//           />
//         )}
//         <div className="p-2">
//           <h4 className="mt-2 text-[#1F1F1F] font-bold text-xl md:text-3xl">
//             {product.title}
//           </h4>
//           {/* {product.productType && (
//             <p className="text-[#1E1E1E] text-sm md:text-base">
//               {product.productType}
//             </p>
//           )} */}
//           {shortDescription && (
//             <p className="text-[#1E1E1E] text-sm md:text-base mt-1 line-clamp-2">
//               {shortDescription}
//             </p>
//           )}
//           <div className="flex items-center gap-2 mt-2">
//             <small className="text-[#1E1E1E] text-2xl md:text-4xl font-semibold">
//               <Money data={firstVariant?.price || product.priceRange.minVariantPrice} />
//             </small>
//             {isOnSale && firstVariant?.compareAtPrice && (
//               <small className="text-[#1E1E1E] text-lg md:text-xl line-through opacity-60">
//                 <Money data={firstVariant.compareAtPrice} />
//               </small>
//             )}
//           </div>
//           {firstVariant?.availableForSale === false && (
//             <p className="text-red-500 text-sm md:text-base mt-1">Out of Stock</p>
//           )}
//           {/* {product.tags?.length > 0 && (
//             <div className="flex gap-2 mt-2">
//               {product.tags.map((tag:any) => (
//                 <span
//                   key={tag}
//                   className="text-xs bg-[#B0EACD] text-[#1F1F1F] px-2 py-1 rounded"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )} */}
//         </div>
//       </Link>

//       {firstVariant?.id && (
//         <AddToCartButton
//           lines={lines}
//           analytics={{
//             productId: product.id,
//             productTitle: product.title,
//             price: firstVariant.price.amount,
//             currency: firstVariant.price.currencyCode,
//           }}
//           disabled={!firstVariant.availableForSale}
//         >
//           <button
//             className={`w-full py-2 rounded transition-all text-white ${
//               firstVariant.availableForSale
//                 ? 'bg-black hover:bg-gray-800'
//                 : 'bg-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {firstVariant.availableForSale
//               ? sellingPlan
//                 ? 'Add Subscription'
//                 : 'Add to Cart'
//               : 'Sold Out'}
//           </button>
//         </AddToCartButton>
//       )}
//     </div>
//   );
// }



import { Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import { AddToCartButton } from './AddToCartButton';
import type {
  CollectionItemFragment,
  ProductItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import { AiFillStar } from 'react-icons/ai';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const firstVariant = product?.variants?.nodes?.[0];
  const image = product.featuredImage;
  const variantUrl = useVariantUrl(product.handle);

  const shortDescription = product.metafields?.find(
    (m: any) => m?.namespace === 'custom' && m?.key === 'short_description'
  )?.value;

  const isOnSale =
    firstVariant?.compareAtPrice?.amount &&
    Number(firstVariant.compareAtPrice.amount) >
      Number(firstVariant.price.amount);

  const sellingPlan =
    product.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0];

  const lines = firstVariant?.id
    ? [
        {
          merchandiseId: firstVariant.id,
          quantity: 1,
          ...(sellingPlan && { sellingPlanId: sellingPlan.id }),
        },
      ]
    : [];

  return (
    <div className="product-item rounded shadow-sm space-y-2 bg-[#FAFAFA] p-4 relative">
      <Link
        key={product.id}
        prefetch="intent"
        to={variantUrl}
        className="block bg-[#FAFAFA] drop-shadow-xl shadow-[#0000001A] relative"
      >
        <div className="relative">
          {image && (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className="w-full object-cover rounded"
            />
          )}

          {/* Out of Stock badge */}
          {firstVariant?.availableForSale === false && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs md:text-sm px-2 py-1 rounded shadow-md z-10">
              Out of Stock
            </span>
          )}

          {/* Dummy Rating */}
          <span className="absolute top-2 right-2 bg-white text-yellow-500 text-xs md:text-sm px-2 py-1 rounded shadow-md flex items-center gap-1 z-10">
            <AiFillStar className="text-yellow-400" />
            4.5
          </span>
        </div>

        <div className="p-2">
          <h4 className="mt-2 text-[#1F1F1F] font-bold text-xl md:text-3xl">
            {product.title}
          </h4>

          {shortDescription && (
            <p className="text-[#1E1E1E] text-sm md:text-base mt-1 line-clamp-2">
              {shortDescription}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <small className="text-[#1E1E1E] text-2xl md:text-4xl font-semibold">
              <Money
                data={firstVariant?.price || product.priceRange.minVariantPrice}
              />
            </small>
            {isOnSale && firstVariant?.compareAtPrice && (
              <small className="text-[#1E1E1E] text-lg md:text-xl line-through opacity-60">
                <Money data={firstVariant.compareAtPrice} />
              </small>
            )}
          </div>
        </div>
      </Link>

      {firstVariant?.id && (
        <AddToCartButton
          lines={lines}
          analytics={{
            productId: product.id,
            productTitle: product.title,
            price: firstVariant.price.amount,
            currency: firstVariant.price.currencyCode,
          }}
          disabled={!firstVariant.availableForSale}
        >
          <button
            className={`w-full py-2 rounded transition-all text-white ${
              firstVariant.availableForSale
                ? 'bg-black hover:bg-gray-800'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {firstVariant.availableForSale
              ? sellingPlan
                ? 'Add Subscription'
                : 'Add to Cart'
              : 'Sold Out'}
          </button>
        </AddToCartButton>
      )}
    </div>
  );
}
