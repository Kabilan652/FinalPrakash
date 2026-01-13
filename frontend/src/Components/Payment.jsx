import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Initialize State
  const [cartItems, setCartItems] = useState(location.state?.items || []);
  const [paymentMethod, setPaymentMethod] = useState("ONLINE"); // 'ONLINE' or 'COD'
  
  const [address, setAddress] = useState({
    name: "",
    pincode: "",
    fullAddress: "",
  });

  // 🚨 SAFETY CHECK: Redirect if no items
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <p className="text-zinc-400 mb-4 text-lg">Your checkout session expired.</p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold hover:bg-emerald-400 transition"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  // 2. 🔄 QUANTITY HANDLER
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = (item.qty || 1) + delta;
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // 3. 🔢 LIVE CALCULATIONS
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );
  
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + Number(item.original_price || item.price) * (item.qty || 1),
    0
  );

  const totalPayable = subtotal; // Assuming free delivery

  // 🛠 HELPER: Load Razorpay Script Dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- 💳 OPTION 1: ONLINE PAYMENT (RAZORPAY) ---
  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    try {
      // 1. Create Order on Backend
      const res = await fetch("http://127.0.0.1:8000/api/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  amount: totalPayable,
  name: address.name,
  address: address.fullAddress,
  pincode: address.pincode,
  user_id: user.id,     //  ADD THIS
  items: cartItems.map(item => ({
    name: item.name,
    price: item.price,
    qty: item.qty
  })),
  payment_mode: paymentMethod
})

      });

      const data = await res.json();

      if (!data.razorpay_order_id) {
        alert("Failed to create payment order. Server error.");
        return;
      }

      // 2. Open Razorpay Modal
      const options = {
        key: "rzp_test_S2wmzfpOPnBhVh", // Replace with your actual Key ID
        amount: data.amount,
        currency: "INR",
        name: "Prakash Traders",
        description: "Order Payment",
        order_id: data.razorpay_order_id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch("http://127.0.0.1:8000/api/verify-payment/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.status === "PAID") {
            navigate("/success", { state: { order_id: verifyData.order_id } });
          } else {
            navigate("/payment-failed");
          }
        },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },
        theme: { color: "#10b981" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong initializing payment.");
    }
  };

  // --- 💵 OPTION 2: CASH ON DELIVERY (COD) ---
  const handleCOD = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayable,
          name: address.name,
          address: address.fullAddress,
          pincode: address.pincode,
      items: cartItems.map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  qty: item.qty || 1
}))
,
          payment_mode: "COD", // Inform backend this is COD
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success: Redirect immediately
        navigate("/success", {
          state: { order_id: data.order_id || `COD-${Date.now()}` },
        });
      } else {
        alert(data.message || "Failed to place COD order. Please try again.");
      }
    } catch (error) {
      console.error("COD Error:", error);
      alert("Network error. Please try again.");
    }
  };

  // 🚀 MAIN SUBMIT HANDLER
  const handlePlaceOrder = () => {
    // Basic Validation
    if (!address.name.trim() || !address.pincode.trim() || !address.fullAddress.trim()) {
      alert("Please fill in all Shipping Address details.");
      return;
    }

    // Switch Logic
    if (paymentMethod === "COD") {
      handleCOD();
    } else {
      handlePayment();
    }
  };

  const isFormValid = address.name && address.pincode && address.fullAddress;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* HEADER */}
        <header className="mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold">
            Review & <span className="text-emerald-500">Pay</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            Secure Checkout • Prakash Traders
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: FORM & PAYMENT METHOD */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Address Section */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📍</span> Shipping Address
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-zinc-800 p-4 rounded-xl border border-transparent focus:border-emerald-500 outline-none transition-all"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full bg-zinc-800 p-4 rounded-xl border border-transparent focus:border-emerald-500 outline-none transition-all"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                />
                <textarea
                  placeholder="Full Address (House No, Street, Landmark)"
                  className="w-full bg-zinc-800 p-4 rounded-xl h-32 border border-transparent focus:border-emerald-500 outline-none transition-all resize-none"
                  value={address.fullAddress}
                  onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
                />
              </div>
            </div>

            {/* 2. Payment Method Section */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">💳 Payment Method</h3>
              
              <div className="space-y-3">
                {/* ONLINE OPTION */}
                <label 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "ONLINE" 
                    ? "border-emerald-500 bg-emerald-500/10" 
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-800/50"
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={() => setPaymentMethod("ONLINE")}
                    className="w-5 h-5 accent-emerald-500"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Pay Online</span>
                    <span className="text-xs text-zinc-500">UPI, Credit/Debit Cards, Netbanking</span>
                  </div>
                </label>

                {/* COD OPTION */}
                <label 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "COD" 
                    ? "border-emerald-500 bg-emerald-500/10" 
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-800/50"
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-5 h-5 accent-emerald-500"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Cash on Delivery</span>
                    <span className="text-xs text-zinc-500">Pay cash upon receiving your order</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-10">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {/* Items List */}
              <div className="max-h-96 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                {cartItems.map((item) => {
                  const qty = item.qty || 1;
                  const unitPrice = Number(item.price);
                  const originalPrice = Number(item.original_price || 0); 
                  const itemTotal = unitPrice * qty;

                  return (
                    <div key={item.id} className="flex gap-4 mb-4 border-b border-zinc-800/50 pb-4 last:border-0">
                      <div className="w-20 h-20 bg-white rounded-lg p-1 shrink-0">
                        <img
                          src={Array.isArray(item.product_image) ? item.product_image[0] : item.image}
                          className="w-full h-full object-contain"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-semibold text-sm line-clamp-1 text-zinc-200">{item.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            {originalPrice > unitPrice && (
                              <p className="text-xs text-zinc-500 line-through">₹{originalPrice.toLocaleString("en-IN")}</p>
                            )}
                            <p className="text-sm font-bold text-emerald-400">₹{unitPrice.toLocaleString("en-IN")}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-end mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-zinc-400 hover:text-white text-lg font-bold px-1"
                            > − </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-emerald-400 hover:text-emerald-300 text-lg font-bold px-1"
                            > + </button>
                          </div>
                          <p className="text-white font-bold text-sm">₹{itemTotal.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 py-4 border-y border-zinc-800 text-sm text-zinc-300">
                {totalMRP > subtotal && (
                   <div className="flex justify-between text-zinc-500">
                     <span>Total MRP</span>
                     <span className="line-through">₹{totalMRP.toLocaleString("en-IN")}</span>
                   </div>
                )}
                <div className="flex justify-between">
                  <span>Price ({cartItems.length} items)</span>
                  <span className="text-white font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {totalMRP > subtotal && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Discount</span>
                    <span>- ₹{(totalMRP - subtotal).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Total Payable</span>
                <span className="text-2xl font-black text-white">
                  ₹{totalPayable.toLocaleString("en-IN")}
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
                className={`mt-6 w-full py-4 rounded-2xl font-black text-lg transition-all ${
                  isFormValid
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                {!isFormValid 
                  ? "ENTER ADDRESS TO PAY" 
                  : paymentMethod === "COD" 
                    ? "PLACE COD ORDER" 
                    : "PROCEED TO PAY"
                }
              </button>
              
              <p className="text-center text-zinc-600 text-xs mt-4">
                {paymentMethod === "COD" ? "Pay securely upon delivery" : "Secured by Razorpay"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;