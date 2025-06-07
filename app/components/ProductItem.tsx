// import { Link } from '@remix-run/react';
// import { Image, Money } from '@shopify/hydrogen';
// import { AddToCartButton } from './AddToCartButton';
// import type {
//   CollectionItemFragment,
//   ProductItemFragment,
//   RecommendedProductFragment,
// } from 'storefrontapi.generated';
// import { useVariantUrl } from '~/lib/variants';
// import { AiFillStar } from 'react-icons/ai';

// export function ProductItem({
//   product,
//   loading,
//   index = 0
// }: {
//   product:
//     | CollectionItemFragment
//     | ProductItemFragment
//     | RecommendedProductFragment;
//   loading?: 'eager' | 'lazy';
//   index?: number;
// }) {
//   const firstVariant = product?.variants?.nodes?.[0];
//   const image = product.featuredImage;
//   const variantUrl = useVariantUrl(product.handle);

//   const shortDescription = product.metafields?.find(
//     (m: any) => m?.namespace === 'custom' && m?.key === 'short_description'
//   )?.value;
  

//   const isOnSale =
//     firstVariant?.compareAtPrice?.amount &&
//     Number(firstVariant.compareAtPrice.amount) >
//       Number(firstVariant.price.amount);

//   const sellingPlan =
//     product.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0];

//   const lines = firstVariant?.id
//     ? [
//         {
//           merchandiseId: firstVariant.id,
//           quantity: 1,
//           ...(sellingPlan && { sellingPlanId: sellingPlan.id }),
//         },
//       ]
//     : [];


//       const buttonColors = [
//     'bg-black',
   
//   ];

//   // Define corresponding hover colors
//   const hoverColors = [
//     'hover:bg-gray-800',
//   ];

//     const buttonBgColor = buttonColors[index % buttonColors.length];
//   const buttonHoverColor = hoverColors[index % hoverColors.length];

//   console.log(`ProductItem - ID: ${product.id}, Index: ${index}, Color: ${buttonColors[index % buttonColors.length]}`);


//   return (
//     <div className="rounded shadow-sm bg-[#FAFAFA] relative poppins">
//       <Link
//         key={product.id}
//         prefetch="intent"
//         to={variantUrl}
//         className="block bg-[#FAFAFA] drop-shadow-xl shadow-[#0000001A] relative cursor-pointer rounded-xl"
//       >
//         <div className="relative overflow-hidden h-1/2 rounded-t-md">
//           {image && (
//             <Image
//               alt={image.altText || product.title}
//               aspectRatio="1/1"
//               data={image}
//               loading={loading}
//               sizes="(min-width: 45em) 400px, 100vw"
//               className="w-full h-full object-cover rounded transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-105"
//             />
//           )}

//           {/* Out of Stock badge */}
//           {firstVariant?.availableForSale === false && (
//             <span className="absolute top-2 left-2 bg-red-600 text-white text-xs md:text-sm px-2 py-1 rounded shadow-md z-10">
//               Out of Stock
//             </span>
//           )}

//           {/* Dummy Rating */}
//           <span className="absolute top-2 right-2 bg-white text-yellow-500 text-xs md:text-sm px-2 py-1 rounded shadow-md flex items-center gap-1 z-10">
//             <AiFillStar className="text-yellow-400" />
//             4.5
//           </span>
//         </div>

//         <div className="p-2">
//           <h4 className="mt-2 text-[#1F1F1F] font-bold text-xs md:text-xl inter line-clamp-2 inter overflow-hidden truncate">
//             {product.title}
//           </h4>

//           {product.description && (
//             <p className="text-[#1E1E1E] text-[8px] md:text-sm mt-1 line-clamp-2 poppins truncate opacity-75">
//               {product.description}
//             </p>
//           )}

//           <div className="flex items-center gap-2 mt-2">
//             <small className="text-[#1E1E1E] text-sm md:text-xl font-semibold">
//               <Money
//                 data={firstVariant?.price || product.priceRange.minVariantPrice}
//               />
//             </small>
//             {isOnSale && firstVariant?.compareAtPrice && (
//               <small className="text-[#1E1E1E] text-xs md:text-sm line-through opacity-60 hidden md:block relative top-0.5">
//                 <Money data={firstVariant.compareAtPrice} />
//               </small>
//             )}
//           </div>
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
//             className={`w-full py-2 transition-all text-white cursor-pointer uppercase rounded-b-md font-bold md:text-lg text-sm ${
//               firstVariant.availableForSale
//                 ? `${buttonBgColor} ${buttonHoverColor}`
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
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export function ProductItem({
  product,
  loading,
  index = 0,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
  index?: number;
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

  // Button colors
  const buttonColors = ['bg-black'];
  const hoverColors = ['hover:bg-gray-800'];

  const buttonBgColor = buttonColors[index % buttonColors.length];
  const buttonHoverColor = hoverColors[index % hoverColors.length];

  
  // Simulated rating (hardcoded to 4.5 for now; can be dynamic via metafield)
  const rating = 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rounded-md shadow-sm bg-[#FAFAFA] relative poppins flex flex-col">
      <Link
        key={product.id}
        prefetch="intent"
        to={variantUrl}
        className="block bg-[#FAFAFA] drop-shadow-xl shadow-[#0000001A] relative cursor-pointer flex-grow"
      >
        <div className="relative overflow-hidden rounded-t-md">
          {image && (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className="w-full h-full object-cover rounded-t-md transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-105"
            />
          )}

          {/* Out of Stock badge */}
          {firstVariant?.availableForSale === false && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs md:text-sm px-2 py-1 rounded shadow-md z-10">
              Out of Stock
            </span>
          )}
        </div>

        <div className="p-2 flex flex-col h-1/2">
          <h4 className="mt-2 text-[#1F1F1F] font-bold text-sm md:text-xl inter line-clamp-2 h-10 md:h-8 overflow-hidden">
            {product.title}
          </h4>

          {product.description && (
            <p className="text-[#1E1E1E] text-[10px] md:text-sm mt-1 line-clamp-3 h-8 md:h-10 poppins opacity-75">
              {product.description}
            </p>
          )}

          {/* Star rating below description */}
          <div className="flex items-center gap-1 mt-1">
            {[...Array(fullStars)].map((_, i) => (
              <AiFillStar key={`full-${i}`} className="text-black text-base md:text-xl" />
            ))}
            {hasHalfStar && (
              <AiOutlineStar key="half" className="text-black text-base md:text-xl" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <AiOutlineStar key={`empty-${i}`} className="text-black text-base md:text-xl" />
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <small className="text-[#1F1F1F] text-sm md:text-xl font-semibold">
              <Money
                data={firstVariant?.price || product.priceRange.minVariantPrice}
              />
            </small>
            {isOnSale && firstVariant?.compareAtPrice && (
              <small className="text-[#1E1E1E] text-xs md:text-sm line-through opacity-60 hidden md:block relative top-0.5">
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
            className={`w-full py-2 transition-all text-white cursor-pointer uppercase rounded-b-md font-bold text-sm md:text-lg ${
              firstVariant.availableForSale
                ? `${buttonBgColor} ${buttonHoverColor}`
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