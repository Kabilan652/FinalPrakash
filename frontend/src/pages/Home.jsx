import { useEffect, useState } from "react";
import AllProducts from "../Components/AllProducts";
import CategorySlider from "../Components/CategorySlider";
import Personalized from "../Components/Personalized";
import Slider from "../Components/Slider";
import BrandSlider from "../Components/BrandPartnersBanner";

const Home = () => {
  const [personalizedProducts, setPersonalizedProducts] = useState([]);
  const category = localStorage.getItem("category");
  const API = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchPersonalized = async () => {
      try {
        let url = `${API}/api/products/random/`;

        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPersonalizedProducts(data);
      } catch (error) {
        console.error("Home personalized fetch error:", error);
      }
    };

    fetchPersonalized();
  }, [category]);

  return (
    <div>
      {/* HERO SLIDER */}
      <Slider />

      {/* CATEGORY */}
      <CategorySlider />

      <div className="container py-4">
        <br />

        {/* ✅ PERSONALIZED (DATA FROM HOME) */}
        <Personalized products={personalizedProducts} />

        <br />

        {/* BRAND PARTNERS */}
        <BrandSlider />

        <br />

        {/* ALL PRODUCTS */}
        <AllProducts />

        {/* STATIC SECTION */}
        <center>
          <p className="text-xl font-bold mt-16 mb-4">
            Our New Favourites
          </p>
        </center>

        <br />

        <div className="flex gap-4 flex-wrap justify-center">
           <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <img
              src="../src/assets/images/banner1.jpeg"
              alt="offer"
              width={250}
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <img
              src="../src/assets/images/banner2.jpeg"
              alt="offer"
              width={250}
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <img
              src="../src/assets/images/banner3.jpeg"
              alt="offer"
              width={250}
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <img
              src="../src/assets/images/banner4.jpeg"
              alt="offer"
              width={250}
            />
          </div>
         


        </div>
      </div>
    </div>
  );
};

export default Home;
