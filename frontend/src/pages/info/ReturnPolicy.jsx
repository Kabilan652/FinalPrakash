const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-[100px] pb-10 px-5">
      <div className="container mx-auto max-w-4xl bg-[#111] p-8 rounded-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">Return & Refund Policy</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Return Eligibility</h2>
            <p>We accept returns under the following conditions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Product is damaged or defective upon delivery.</li>
              <li>Wrong product was delivered.</li>
              <li>Product is returned within 7 days of delivery.</li>
              <li>Original packaging and tags must be intact.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Non-Returnable Items</h2>
            <p>We do not accept returns for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Personal care products (e.g., Shavers, Trimmers).</li>
              <li>Products damaged due to misuse.</li>
              <li>Accessories/Freebies if the main product is kept.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Refund Process</h2>
            <p>Once we receive the returned item, we will inspect it. If approved, the refund will be initiated to your original payment method within 5-7 business days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. Contact Us</h2>
            <p>To initiate a return, please email us at <span className="text-emerald-400">support@prakashtraders.com</span> with your Order ID and photos of the issue.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;