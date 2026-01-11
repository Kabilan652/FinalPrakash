import { useContext } from "react";
import { ContextProvider } from "../Context/Context"; // Adjust path
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeartBroken } from "react-icons/fa"; // Added HeartBroken icon for better UI
import { IoClose } from "react-icons/io5";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(ContextProvider);

  // 🔹 Empty Wishlist UI (Updated to match Cart style)
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <FaHeartBroken className="w-20 h-20 text-gray-600 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty 💔</h2>
        <Link
          to="/"
          className="text-emerald-400 underline text-lg hover:text-emerald-300 transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  // 🔹 Populated Wishlist UI
  return (
    // Added 'min-h-screen' here too, so footer stays down even with 1 item
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4"> 
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative bg-[#121212] border border-white/10 p-4 rounded-xl group hover:border-emerald-500/50 transition-all">
              
              {/* Remove Button */}
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition z-10 bg-[#121212] rounded-full p-1"
              >
                <IoClose size={20} />
              </button>

              <Link to={`/product/${item.id}`}>
                <div className="h-40 flex items-center justify-center mb-4 bg-white/5 rounded-lg p-2">
                  <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                </div>
                <h3 className="text-white text-sm font-medium line-clamp-1">{item.name}</h3>
                <p className="text-emerald-400 font-bold mt-1">₹{Number(item.price).toLocaleString("en-IN")}</p>
              </Link>

              <button 
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-emerald-500 hover:text-black text-white py-2 rounded-md text-sm transition-all font-semibold"
              >
                <FaShoppingCart /> Move to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;