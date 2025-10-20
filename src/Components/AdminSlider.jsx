import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

const SlideContent = ({ med }) => (
  <div
    key={med._id}
    className="relative w-full flex flex-col md:flex-row items-center justify-center h-auto min-h-[500px] 
               bg-green-200 transition-colors duration-500"
  >
    {/* Overlay for contrast */}
    <div className="absolute inset-0 bg-green-300 opacity-80 transition-colors duration-500" />

    <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 md:p-16 
                    bg-white/20 backdrop-blur-md rounded-xl shadow-lg transition-colors duration-500">
      
      <div className="flex-1 max-w-lg text-green-800 text-center md:text-left mb-8 md:mb-0 md:mr-10 transition-colors duration-500">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          animate={{
            color: ["#008000", "#FF0000", "#0000FF", "#000000"],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {med.name}
        </motion.h2>

        {med.description && (
          <p className="text-base sm:text-lg md:text-xl font-light text-black transition-colors duration-500">
            {med.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mt-4">
          {med.discount ? (
            <>
              <p className="text-lg sm:text-2xl font-bold text-green-500">
                ${(med.price - (med.price * med.discount) / 100).toFixed(2)}
              </p>
              <p className="line-through text-white text-lg sm:text-xl">
                ${med.price}
              </p>
              <span className="text-red-400 font-bold text-xl sm:text-2xl">
                {med.discount}% OFF
              </span>
            </>
          ) : (
            <p className="text-lg sm:text-2xl font-bold text-black">
              ${med.price}
            </p>
          )}
        </div>

        <Link to="/shop">
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </Link>
      </div>

      {med.image && (
        <div className="flex justify-center items-center w-full md:w-1/2 overflow-hidden rounded-2xl 
                        bg-white/10 transition-colors duration-500">
          <img
            src={med.image}
            alt={med.name}
            className="rounded-md w-[220px] h-[320px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] object-cover 
                       transition-transform duration-500 transform hover:scale-105"
          />
        </div>
      )}
    </div>
  </div>
);

const AdminSlider = () => {
  const {
    data: medicines = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sliderMedicines"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/slider-medicines`
      );
      return res.data || [];
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul className="flex gap-2 justify-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/50 hover:bg-white transition-all duration-300" />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  if (isLoading)
    return <div className="text-center p-10 font-medium">Loading slider...</div>;
  if (isError)
    return (
      <div className="text-center p-10 text-red-500 font-medium">
        Error loading slider: {error?.message}
      </div>
    );
  if (medicines.length === 0)
    return <div className="text-center p-10 rounded-lg">No slides available.</div>;

  return (
    <div className="mt-20 sm:mt-20 mb-8 sm:mb-20">
      <div className="max-w-[1500px] mx-auto rounded-xl shadow-2xl overflow-hidden relative">
        <Slider {...settings}>
          {medicines.map((med) => (
            <SlideContent key={med._id} med={med} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AdminSlider;














































































































































