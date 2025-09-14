import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";

const CategorySection = () => {
  const navigate = useNavigate();

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/categories");
      console.log(res.data);
      return res.data; 
    },
  });

  if (isLoading) {
    return <p className="text-center py-10 text-lg">Loading categories...</p>;
  }

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${categoryName}`);
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-green-500 mb-12">
          Explore Our Categories
        </h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl group cursor-pointer"
                onClick={() => handleCategoryClick(category.categoryName)}
              >
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category.categoryName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No categories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;










