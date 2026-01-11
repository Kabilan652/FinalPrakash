import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ DATA FROM CART PAGE
  const { items, total } = location.state || {};
  const cartItems = items || [];

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [address, setAddress] = useState({
    name: "",
    pincode: "",
    fullAddress: "",
  });

  // 🚨 SAFETY CHECK
  if (!cartItems.length) {
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

  // 🔢 CALCULATIONS
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const originalPrice = Math.round(subtotal * 1.2);
  const discountAmount = originalPrice - subtotal;
  const gstAmount = Math.round(subtotal * 0.18);
  const deliveryCharges = 0;
  const totalPayable = subtotal + deliveryCharges;

 const handlePayment = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/create-order/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      amount: totalPayable,
      name: address.name,
      address: address.fullAddress,
      pincode: address.pincode,
    }),
  });

  const data = await res.json();
  navigate("/upi-pay", { state: data });
};

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

          {/* LEFT SIDE */}
          <div className="lg:col-span-7 space-y-6">

            {/* PAYMENT METHOD */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">💳 Payment Method</h3>

              <div
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-xl border-2 cursor-pointer mb-3 ${
                  paymentMethod === "upi"
                    ? "border-emerald-500 bg-emerald-500/5"
                    : "border-zinc-800"
                }`}
              >
                <p className="font-bold text-sm">UPI (GPay / PhonePe)</p>
              </div>

              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border-2 cursor-pointer ${
                  paymentMethod === "card"
                    ? "border-emerald-500 bg-emerald-500/5"
                    : "border-zinc-800"
                }`}
              >
                <p className="font-bold text-sm">Credit / Debit Card</p>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">📍 Shipping Address</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-zinc-800 p-3 rounded-xl"
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full bg-zinc-800 p-3 rounded-xl"
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />
                <textarea
                  placeholder="Full Address"
                  className="w-full bg-zinc-800 p-3 rounded-xl h-24"
                  onChange={(e) =>
                    setAddress({ ...address, fullAddress: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-10">

              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {/* PRODUCTS */}
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4">
                  <div className="w-20 h-20 bg-white rounded-xl p-2">
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
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-zinc-500">
                      Qty: {item.qty || 1}
                    </p>
                    <p className="text-emerald-400 font-bold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}

              {/* BILL */}
              <div className="space-y-3 py-4 border-y border-zinc-800 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-emerald-500">
                    - ₹{discountAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-6 flex justify-between text-2xl font-black">
                <span>Total</span>
                <span>₹{totalPayable.toLocaleString("en-IN")}</span>
              </div>

              <button
                onClick={handlePayment}
                className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-black text-lg"
              >
                PLACE ORDER
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
