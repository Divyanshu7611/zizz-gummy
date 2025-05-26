import React from 'react';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import Button from '~/components/mini/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ProductItem } from '~/components/ProductItem';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';
import 'swiper/css';

interface RecommendedProductsProps {
  products: RecommendedProductsQuery['products']['nodes'];
}

function RecommendedProducts({ products }: RecommendedProductsProps) {
  if (!products?.length) {
    return (
      <div className="text-center text-lg text-gray-600">
        No recommended products available.
      </div>
    );
  }

  return (
    <div className="recommended-products px-2 py-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-6">
        <h3 className="text-[#1F1F1F] text-2xl sm:text-3xl lg:text-4xl font-bold">
          Explore Our Gummies
        </h3>
        <Button text="Learn More" bgColor="bg-[#1E1E1E]" icon={<BsArrowUpRightCircle />} />
      </div>

      <div>
        <div className="block md:hidden">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay]}
            grabCursor={true}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedProducts;
