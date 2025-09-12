import { Link } from "react-router";
import painReliefImage from "../assets/pain releif medicine.jpg"; 
import antibiotic from "../assets/antibiotic.jpg";
import vitamin from "../assets/vitamin.jpg";
import cold from "../assets/cold and cough.jpg";
import skin from "../assets/skin care.jpg";
import digestive from "../assets/digestive.jpg";
import diabetes from "../assets/diabates.jpg";
import eye from "../assets/eye.jpg";

const categories = [
  { name: "Pain Relief", image: painReliefImage },
  { name: "Antibiotics", image: antibiotic },
  { name: "Vitamins", image: vitamin },
  { name: "Cough & Cold", image: cold },
  { name: "Skin Care", image: skin },
  { name: "Digestive Health", image: digestive },
  { name: "Diabetes Care", image: diabetes },
  { name: "Eye & Ear Care", image: eye },
];

const CategorySection = () => {
  return (
    <section className="max-w-7xl  mx-auto px-4 py-10 mt-10">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-10">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
          >
            <div
              className="
                cursor-pointer 
                rounded-xl 
                overflow-hidden 
                shadow-lg 
                transform transition-transform duration-300 
                hover:scale-105 
                border-2 border-transparent
              "
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 bg-white text-center">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;









