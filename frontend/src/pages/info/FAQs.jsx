import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How do I track my order?", a: "You can track your order by visiting the 'My Orders' section. Once shipped, you will also receive an SMS with the tracking link." },
    { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for defective or damaged products. Please visit our Return Policy page for details." },
    { q: "Do you offer No Cost EMI?", a: "Yes, we offer No Cost EMI on select credit cards and Bajaj Finserv cards for orders above ₹5,000." },
    { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days. Express delivery is available for select pincodes." },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-[100px] pb-10 px-5 font-sans">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h1>
        
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-800 rounded-2xl bg-gray-900/50 overflow-hidden hover:border-gray-700 transition-colors">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className={`font-bold transition-colors ${openIndex === index ? 'text-blue-500' : 'text-gray-200'}`}>
                  {item.q}
                </span>
                {openIndex === index ? <FaMinus className="text-blue-500" /> : <FaPlus className="text-gray-500" />}
              </button>
              
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;