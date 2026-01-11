import { CiSearch } from "react-icons/ci";
import { useState } from "react";

/* DEMO CATEGORIES */
const categories = [
    {
      name: "Home Appliances",
      sub: ["Refrigerators", "Washing Machines", "Microwaves"],
    },

    {
        name: "Kitchen Appliances",
        sub: ["Mixers", "Grinders", "Power Hobs", "Chimneys", "Tower Fans", "E-Rice Cookers", "E-Kettles"],
    },
  ];

const SearchBar = ({
  autoFocus = false,
  handleSearch,
  window,
  data
}) => {
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="relative w-full">

      {/* SEARCH BAR CONTAINER */}
      <div className="flex items-center bg-white text-black px-3 py-1 rounded-full border w-full">

        {/* SEARCH INPUT */}
        <input
          type="text"
          autoFocus={autoFocus}
          className="outline-none w-full text-base bg-transparent"
          placeholder={`Search in ${selectedCategory}`}
          onChange={handleSearch}
        />

        

        {/* SEARCH ICON WITH DIFFERENT BG */}
        <button
          type="button"
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
        >
          <CiSearch className="w-6 h-6" />
        </button>

      </div>

      {/* SEARCH RESULTS */}
      {window && (
        <div className="absolute top-full left-0 bg-white border shadow-md w-full mt-2 z-10 max-h-64 overflow-y-auto custom-scrollbar rounded-md">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default SearchBar;
