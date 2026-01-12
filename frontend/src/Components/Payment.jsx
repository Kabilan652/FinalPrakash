import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Initialize State with data from Cart Page
  const [cartItems, setCartItems] = useState(location.state?.items || []);
  
  const [address, setAddress] = useState({
    name: "",
    pincode: "",
    fullAddress: "",
  });

  // 🚨 SAFETY CHECK
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <p className="text-zinc-400 mb-4 text-lg">
          Your checkout session expired.
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold"
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
          // Prevent quantity from going below 1
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // 3. 🔢 LIVE CALCULATIONS
  
  // Calculate Selling Price Total (What user pays)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  // Calculate Total MRP (Original Price Total)
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + Number(item.original_price || item.price) * (item.qty || 1),
    0
  );

  // GST REMOVED ❌
  const totalPayable = subtotal; // Delivery is free

  const handlePayment = async () => {
    // 🚨 VALIDATION CHECK
    if (!address.name.trim() || !address.pincode.trim() || !address.fullAddress.trim()) {
      alert("Please fill in all Shipping Address details before placing the order.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayable,
          name: address.name,
          address: address.fullAddress,
          pincode: address.pincode,
          items: cartItems.map(item => ({ id: item.id, qty: item.qty })) 
        }),
      });

      const data = await res.json();

      if (!data.razorpay_order_id) {
        alert("Failed to create payment order");
        return;
      }

      const options = {
        key: "rzp_test_S2wmzfpOPnBhVh",
        amount: data.amount,
        currency: "INR",
        name: "Prakash Traders",
        description: "Order Payment",
        order_id: data.razorpay_order_id,
        handler: async function (response) {
          const verifyRes = await fetch(
            "http://127.0.0.1:8000/api/verify-payment/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );
          const verifyData = await verifyRes.json();
          if (verifyData.status === "PAID") {
            navigate("/success", {
              state: { order_id: verifyData.order_id },
            });
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
      console.error(error);
      alert("Something went wrong. Try again.");
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
            Order ID: #CRM_{Math.floor(Math.random() * 100000)}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT SIDE: ADDRESS FORM */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📍</span> Shipping Address
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-zinc-800 p-4 rounded-xl border border-transparent focus:border-emerald-500 outline-none transition-all"
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full bg-zinc-800 p-4 rounded-xl border border-transparent focus:border-emerald-500 outline-none transition-all"
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />
                <textarea
                  placeholder="Full Address (House No, Street, Landmark)"
                  className="w-full bg-zinc-800 p-4 rounded-xl h-32 border border-transparent focus:border-emerald-500 outline-none transition-all resize-none"
                  onChange={(e) =>
                    setAddress({ ...address, fullAddress: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SUMMARY & CALCULATOR */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-10">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {/* PRODUCTS LIST */}
              <div className="max-h-96 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                {cartItems.map((item) => {
                  const qty = item.qty || 1;
                  const unitPrice = Number(item.price);
                  const originalPrice = Number(item.original_price || 0); 
                  const itemTotal = unitPrice * qty;

                  return (
                    <div key={item.id} className="flex gap-4 mb-4 border-b border-zinc-800/50 pb-4 last:border-0">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-white rounded-lg p-1 shrink-0">
                        <img
                          src={
                            Array.isArray(item.product_image)
                              ? item.product_image[0]
                              : item.image
                          }
                          className="w-full h-full object-contain"
                          alt={item.name}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-semibold text-sm line-clamp-1 text-zinc-200">
                            {item.name}
                          </p>
                          
                          <div className="mt-1 flex items-center gap-2">
                            {/* Item Level Strikethrough */}
                            {originalPrice > unitPrice && (
                              <p className="text-xs text-zinc-500 line-through">
                                ₹{originalPrice.toLocaleString("en-IN")}
                              </p>
                            )}
                            <p className="text-sm font-bold text-emerald-400">
                              ₹{unitPrice.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-end mt-2">
                          {/* ➕➖ QTY BUTTONS */}
                          <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-zinc-400 hover:text-white text-lg font-bold px-1"
                            >
                              −
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-emerald-400 hover:text-emerald-300 text-lg font-bold px-1"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-white font-bold text-sm">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BILL DETAILS */}
              <div className="space-y-3 py-4 border-y border-zinc-800 text-sm text-zinc-300">
                
                {/* Total MRP (Strikethrough) */}
                {totalMRP > subtotal && (
                   <div className="flex justify-between text-zinc-500">
                     <span>Total MRP</span>
                     <span className="line-through">₹{totalMRP.toLocaleString("en-IN")}</span>
                   </div>
                )}

                {/* Selling Price Total */}
                <div className="flex justify-between">
                  <span>Price ({cartItems.length} items)</span>
                  <span className="text-white font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {/* Savings Display */}
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

              {/* TOTAL PAYABLE */}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Total Payable</span>
                <span className="text-2xl font-black text-white">
                  ₹{totalPayable.toLocaleString("en-IN")}
                </span>
              </div>

              {/* PAY BUTTON */}
              <button
                onClick={handlePayment}
                disabled={!isFormValid}
                className={`mt-6 w-full py-4 rounded-2xl font-black text-lg transition-all ${
                  isFormValid
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                {isFormValid ? "PROCEED TO PAY" : "ENTER ADDRESS TO PAY"}
              </button>
              
              <p className="text-center text-zinc-600 text-xs mt-4">
                Secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;