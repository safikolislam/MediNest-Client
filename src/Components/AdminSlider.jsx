import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

// Custom Arrows
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} !w-12 !h-12 !bg-white/30 rounded-full flex items-center justify-center shadow-xl hover:bg-white/50 transition-transform duration-300 transform hover:scale-110`}
    style={{ ...style, display: "flex", right: 15, zIndex: 10 }}
    onClick={onClick}
  >
    <FaChevronRight className="text-white text-xl" />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} !w-12 !h-12 !bg-white/30 rounded-full flex items-center justify-center shadow-xl hover:bg-white/50 transition-transform duration-300 transform hover:scale-110`}
    style={{ ...style, display: "flex", left: 15, zIndex: 10 }}
    onClick={onClick}
  >
    <FaChevronLeft className="text-white text-xl" />
  </div>
);

const AdminSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ["sliderMedicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/slider-medicines");
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
      <div style={{ bottom: "20px" }}>
        <ul className="flex gap-2 justify-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-4 h-4 rounded-full bg-white/50 hover:bg-white transition-all duration-300" />
    ),
    responsive: [
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
    <div className="mt-10 mb-5 w-full py-12 font-sans bg-gray-50">
      <div className="max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden relative">
        <Slider {...settings}>
          {medicines.map((med) => (
            <div
              key={med._id}
              className="relative w-full flex flex-col md:flex-row items-center justify-center h-[400px] md:h-[500px]"
            >
           
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-300 to-purple-400 animate-gradient-x" />

             
              <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-16
                              bg-white/20 backdrop-blur-xl rounded-xl shadow-lg">
              
                <div className="flex-1 max-w-lg text-white space-y-4 text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                    {med.name}
                  </h2>

                  {med.description && (
                    <p className="text-lg md:text-xl font-light">{med.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    {med.discount ? (
                      <>
                        <p className="text-xl md:text-3xl font-bold text-blue-500">
                          ${ (med.price - (med.price * med.discount) / 100).toFixed(2) }
                        </p>
                        <p className="line-through text-white">${med.price}</p>
                        <span className=" text-white px-2 py-1 rounded-full text-3xl">
                          {med.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <p className="text-xl md:text-3xl font-bold">${med.price}</p>
                    )}
                  </div>

                  <Link to="/shop"><button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105">
                    Shop Now
                  </button></Link>
                </div>

{med.image && (
  <div className="mt-6 md:mt-0 md:flex flex-1 items-center justify-center">
    <img
      src={med.image}
      alt={med.name}
      className="
        w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[400px] md:h-[400px]
        object-cover
        drop-shadow-2xl
        transition-transform duration-500 transform hover:scale-105
        rounded-xl
      "
    />
  </div>
)}

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AdminSlider;























