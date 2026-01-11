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

  // Alias the context function to avoid naming conflicts
  const { addToCart: contextAddToCart } = useContext(ContextProvider);


  // STEP 1: DEFINE THE HELPER FUNCTIONS (These were missing!)
  
  
  // Helper: Ensures the image URL is absolute (http://localhost:8000/...)
  const toFullImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    const cleanPath = img.startsWith("/") ? img : `/${img}`;
    return `http://localhost:8000${cleanPath}`;
  };

  // Helper: Gets the first valid image from the product object
  const getProductImage = (product) => {
    const rawImage = product.image_1 || product.image_2 || product.image_3;
    return toFullImageUrl(rawImage);
  };
  // -------------------------------------------------------------------

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/products/${id}/`);
      
      const productData = res.data;
      setProduct(productData);

      // Combine backend images into one array
      const images = [
        productData.image_1,
        productData.image_2,
        productData.image_3
      ].filter(Boolean);

      // Process images to be full URLs immediately for the gallery
      const fullImages = images.map(img => toFullImageUrl(img));

      setGalleryImages(fullImages);
      
      // Default to the first image available
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

  // ✅ STEP 2: USE THE HELPERS IN ADD TO CART
 const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        // Use the image the user is currently looking at, 
        // or fallback to the default main image
        image: activeImage || getProductImage(product),
      };
      
      contextAddToCart(cartItem);
    }
  };
  const handleBuyNow = () => {
    if (!product) return;
    navigate("/payment", {
      state: {
        items: [{ 
            ...product, 
            qty: 1, 
            image: activeImage || getProductImage(product) 
        }],
        total: product.price,
        source: "buy_now"
      }
    });
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-400">
        <div className="animate-pulse">Loading Product...</div>
      </div>
    );
  }

  const {
    name,
    price,
    description,
    rating = 0,
    reviews = 0,
    brand = "",
    product_color = "",
    in_stock = true,
  } = product;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 pb-20 pt-8">
      <div className="container mx-auto px-4">
        <Link to={-1} className="text-zinc-500 hover:text-emerald-400 text-sm inline-flex items-center gap-2 mb-6">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div>
            {/* Main Large Image */}
            <div className="h-[450px] bg-zinc-800 rounded-2xl flex items-center justify-center p-6 border border-zinc-700/50">
              <img
                src={activeImage}
                alt={name}
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400"; }}
              />
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-20 flex-shrink-0 p-2 rounded-xl border transition-all ${
                      activeImage === img ? "border-emerald-500 bg-zinc-800" : "border-zinc-700 bg-zinc-900"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: PRODUCT DETAILS --- */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="flex items-center gap-3 mt-2">
                {rating > 0 && (
                  <span className="bg-emerald-500 text-black px-2 py-1 rounded text-sm font-bold">
                    {rating} ★
                  </span>
                )}
                <span className="text-zinc-400 text-sm">({reviews} Reviews)</span>
                {brand && <span className="text-zinc-500 uppercase text-xs tracking-widest">{brand}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-3">
                <h2 className="text-4xl font-bold text-white">
                  ₹{Number(price).toLocaleString("en-IN")}
                </h2>
                <span className="text-lg text-zinc-500 line-through">
                  ₹{Math.round(price * 1.2).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleBuyNow} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3 rounded-xl font-bold transition-colors">
                Buy Now
              </button>
              <button onClick={handleAddToCart} disabled={!in_stock} className={`flex-1 py-3 rounded-xl border font-semibold transition-all ${in_stock ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
                {in_stock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl">
              <h3 className="font-semibold mb-2 text-emerald-400">Key Features</h3>
              <p className="text-sm text-zinc-400 whitespace-pre-line leading-relaxed">
                {description || "No description available."}
              </p>
              {product_color && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                   <p className="text-sm text-zinc-300"><span className="text-zinc-500">Color:</span> {product_color}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;