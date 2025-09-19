import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,  Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DiscountProducts = () => {
  const { data: discountedMedicines, isLoading, error } = useQuery({
    queryKey: ['discountedMedicines'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/discount-medicines`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-lg text-gray-600">Loading discounted products...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error loading products: {error.message}</p>;
  }

  if (!discountedMedicines || discountedMedicines.length === 0) {
    return <p className="text-center text-lg text-gray-500">No discounted products available.</p>;
  }

  return (
    <div className="bg-gray-100 py-12 mt-44">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-500 mb-10 ">
           Products on Discount
        </h2>
        <Swiper
          modules={[ Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
         
          pagination={{ clickable: true }}
          grabCursor={true}
          autoplay={{
            delay: 3000, // Corrected delay to a more readable speed
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
              pagination: false,
              navigation: true,
            },
          }}
        >
          {discountedMedicines.map((medicine) => (
            <SwiperSlide key={medicine._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 relative">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                  {medicine.discount}% OFF
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{medicine.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 line-through">${medicine.price.toFixed(2)}</p>
                      <p className="text-xl font-bold text-red-600">
                        ${(medicine.price * (1 - medicine.discount / 100)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProducts;












