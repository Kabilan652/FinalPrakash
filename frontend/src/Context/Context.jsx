import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext();

const Context = ({ children }) => {
  // 🔐 AUTH STATE
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
    const API = import.meta.env.VITE_API_URL;


  // 🛒 CART & ❤️ WISHLIST
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuth(true);
      setToken(token);
      setRole(role);
    }
  }, []);

  // 🔁 Restore cart & wishlist on refresh
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const savedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];

    setCartItems(savedCart);
    setWishlistItems(savedWishlist);
  }, []);

  // 💾 Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 💾 Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // 🔑 LOGIN
  const login = (token, role) => {
    setIsAuth(true);
    setToken(token);
    setRole(role);

    localStorage.setItem("access_token", token);
    localStorage.setItem("role", role);
  };

  // 🚪 LOGOUT
  const logout = () => {
    setIsAuth(false);
    setToken(null);
    setRole(null);

    setCartItems([]);
    setWishlistItems([]);

    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishlistItems");
  };

  // 🖼️ IMAGE NORMALIZER
  const toFullImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `${API}${img}`;
  };

  // 🧠 NORMALIZE PRODUCT
  const normalizeProduct = (product) => ({
    ...product,
    image: toFullImageUrl(product.image || product.image_1),
  });

  // 🛒 ADD TO CART
  const addToCart = (product) => {
    const normalized = normalizeProduct(product);
    const exist = cartItems.find((x) => x.id === normalized.id);

    if (exist) return false;

    setCartItems([...cartItems, { ...normalized, qty: 1 }]);
    return true;
  };

  // 🗑️ REMOVE FROM CART
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x.id !== id));
  };

  // ❤️ ADD TO WISHLIST
  const addToWishlist = (product) => {
    const normalized = normalizeProduct(product);
    const exist = wishlistItems.find((x) => x.id === normalized.id);

    if (exist) return false;

    setWishlistItems([...wishlistItems, normalized]);
    return true;
  };

  // ❌ REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((x) => x.id !== id));
  };

  return (
    <ContextProvider.Provider
      value={{
        // 🔐 AUTH
        isAuth,
        token,
        role,
        login,
        logout,

        // 🛒 CART
        cartItems,
        addToCart,
        removeFromCart,

        // ❤️ WISHLIST
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
