import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

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
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  return (
    <div className="product-item rounded shadow-sm space-y-2 bg-[#FAFAFA]">
      <Link
        key={product.id}
        prefetch="intent"
        to={variantUrl}
        className="block bg-[#FAFAFA] drop-shadow-xl shadow-[#0000001A]"
      >
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading} 
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
        <div className='p-2'>

        <h4 className="mt-2 text-[#1F1F1F] font-bold text-3xl">{product.title}</h4>
        <small className="text-[#1E1E1E] text-4xl font-semibold">
          <Money data={product.priceRange.minVariantPrice} />
        </small>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-all"
        onClick={() => alert(`Add ${product.title} to cart`)} // replace with real function later
      >
        Add to Cart
      </button>
    </div>
  );
}
