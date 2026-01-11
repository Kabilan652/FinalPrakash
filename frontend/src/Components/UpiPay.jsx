import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const UpiPay = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [txn, setTxn] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTxn = async () => {
  if (!txn || txn.length < 10) {
    alert("Enter valid transaction ID");
    return;
  }

     const res = await fetch("http://127.0.0.1:8000/api/submit-transaction/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      order_id: state.order_id,
      transaction_id: txn,
    }),
  });

      const data = await res.json();

  if (data.status === "PAID") {
    navigate("/success", { state: { order_id: data.order_id } });
  } else {
    navigate("/payment-failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center text-emerald-500">
          Complete Your Payment
        </h1>
        <p className="text-center text-zinc-400 text-sm mt-1">
          Scan QR using any UPI app
        </p>

        {/* QR */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <img
              src={`http://127.0.0.1:8000${state.qr}`}
              alt="UPI QR"
              className="w-52 h-52 object-contain"
            />
          </div>
        </div>

        {/* AMOUNT */}
        <p className="text-center text-lg font-bold text-white mt-4">
          Amount: <span className="text-emerald-400">₹{state.amount}</span>
        </p>

        {/* UPI APP ICONS */}
        <div className="flex justify-center gap-4 mt-4">
          <img src="/upi/gpay.png" alt="GPay" className="h-8 " />
          <img src="/prakash/backend/media/icons8-google-pay-50.png" alt="PhonePe" className="h-8" />
          <img src="/upi/paytm.png" alt="Paytm" className="h-8" />
        </div>

        {/* INSTRUCTIONS */}
        <div className="mt-4 text-xs text-zinc-400 text-center space-y-1">
          <p>1️⃣ Scan the QR code</p>
          <p>2️⃣ Complete payment</p>
          <p>3️⃣ Enter Transaction ID below</p>
        </div>

        

        {/* TRANSACTION INPUT */}
        <input
          type="text"
          placeholder="Enter UPI Transaction ID"
          className="mt-5 w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={txn}
          onChange={(e) => setTxn(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={submitTxn}
          disabled={loading}
          className="mt-4 w-full py-3 rounded-xl font-bold text-black bg-emerald-500 hover:bg-emerald-400 transition disabled:opacity-50"
        >
          {loading ? "Verifying Payment..." : "Confirm Payment"}
        </button>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-zinc-500 mt-4">
          🔒 Your payment is secure & encrypted
        </p>
      </div>
    </div>
  );
};

export default UpiPay;
