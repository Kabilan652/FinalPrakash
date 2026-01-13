import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../Context/Context";

const SingleItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL;

  
  // ✅ New State for Auto-Scroll Pausing
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart: contextAddToCart } = useContext(ContextProvider);

  // --- HELPER FUNCTIONS ---
  const toFullImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    const cleanPath = img.startsWith("/") ? img : `/${img}`;
    return `${API}${cleanPath}`;
  };

  const getProductImage = (product) => {
    const rawImage = product.image_1 || product.image_2 || product.image_3;
    return toFullImageUrl(rawImage);
  };

  // --- FETCH DATA ---
  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/products/${id}/`);
      const productData = res.data;
      setProduct(productData);

      const images = [
        productData.image_1,
        productData.image_2,
        productData.image_3,
      ].filter(Boolean);

      const fullImages = images.map((img) => toFullImageUrl(img));
      setGalleryImages(fullImages);

      if (fullImages.length > 0) {
        setActiveImage(fullImages[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // ✅ AUTO-SCROLL EFFECT
  useEffect(() => {
    // Don't scroll if hovered or if there is only 1 image
    if (galleryImages.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setActiveImage((currentImage) => {
        const currentIndex = galleryImages.indexOf(currentImage);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        return galleryImages[nextIndex];
      });
    }, 3000); // ⏱️ Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup timer
  }, [galleryImages, isHovered]);


  // --- HANDLERS ---
  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        image: activeImage || getProductImage(product),
      };
      contextAddToCart(cartItem);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate("/payment", {
      state: {
        items: [
          {
            ...product,
            qty: 1,
            image: activeImage || getProductImage(product),
          },
        ],
        total: product.price,
        source: "buy_now",
      },
    });
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-400">
        <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Loading Details...</p>
        </div>
      </div>
    );
  }

  const {
    name,
    price,
    original_price,
    description,
    rating = 0,
    reviews_count = 0,
    brand = "",
    product_color = "",
    in_stock = true,
  } = product;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 pb-10 pt-6 font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* BREADCRUMB */}
        <nav className="mb-6">
            <Link
            to={-1}
            className="text-zinc-500 hover:text-emerald-400 text-xs sm:text-sm inline-flex items-center gap-2 transition-colors"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Products
            </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* --- LEFT: COMPACT IMAGE GALLERY --- */}
          <div className="flex flex-col gap-3">
            
            {/* ✅ Main Image Stage with Hover Event */}
            <div 
              className="w-full h-[350px] sm:h-[400px] bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800 relative group flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)} // Pause on hover
              onMouseLeave={() => setIsHovered(false)} // Resume on leave
            >
              <img
                src={activeImage}
                alt={name}
                className="max-w-full max-h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />
              
              {/* Optional: Auto-scroll indicator (hidden unless relevant) */}
              {!isHovered && galleryImages.length > 1 && (
                 <div className="absolute bottom-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg border overflow-hidden bg-zinc-900 transition-all ${
                      activeImage === img
                        ? "border-emerald-500"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: COMPACT DETAILS --- */}
          <div className="flex flex-col h-fit">
            
            {/* 1. Brand & Title */}
            <div className="mb-3">
                {brand && (
                    <span className="text-emerald-500 font-bold tracking-wide text-[10px] uppercase mb-1 block">
                        {brand}
                    </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {name}
                </h1>
            </div>

            {/* 2. Rating & Reviews */}
            <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                    <span className="text-xs font-bold text-white">{rating}</span>
                    <svg className="w-3 h-3 text-emerald-500 fill-emerald-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <span className="text-zinc-500 text-xs">
                   {reviews_count} Reviews
                </span>
            </div>

            {/* 3. Price Block */}
            <div className="mb-6 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-white">
                        ₹{Number(price).toLocaleString("en-IN")}
                    </h2>
                    {original_price && Number(original_price) > Number(price) && (
                        <>
                            <span className="text-sm text-zinc-500 line-through">
                                ₹{Number(original_price).toLocaleString("en-IN")}
                            </span>
                            <span className="text-emerald-400 text-xs font-bold ml-1">
                                {Math.round(((Number(original_price) - Number(price)) / Number(original_price)) * 100)}% OFF
                            </span>
                        </>
                    )}
                </div>
                <p className="text-zinc-500 text-[10px] mt-1">Inclusive of all taxes</p>
            </div>

            {/* 4. Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleBuyNow}
                disabled={!in_stock}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all transform active:scale-95 ${
                    in_stock 
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-900/20" 
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {in_stock ? "Buy Now" : "Out of Stock"}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={!in_stock}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base border transition-all transform active:scale-95 ${
                  in_stock
                    ? "bg-transparent border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </div>

            {/* 5. Product Description & Details */}
            <div className="space-y-4 flex-grow">
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-4">
                    <h3 className="font-semibold text-sm text-white mb-2">Description</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {description || "No description available."}
                    </p>

                    {product_color && (
                        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2">
                            <span className="text-zinc-500 text-xs font-medium">Color:</span>
                            <span className="text-zinc-300 text-xs capitalize">{product_color}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 6. Footer note */}
            <div className="mt-4 flex items-center gap-2 text-zinc-600 text-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Secure Payment & Fast Delivery</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;