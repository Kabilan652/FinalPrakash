import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-[100px] pb-10 px-5">
      <div className="container mx-auto max-w-5xl">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact & Support</h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a question about your order or need technical support? We're here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* CONTACT FORM */}
          <div className="bg-[#111] p-8 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-6 text-emerald-400">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Your Name</label>
                <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-sm focus:border-emerald-500 outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                <input type="email" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-sm focus:border-emerald-500 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Message</label>
                <textarea rows="4" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-sm focus:border-emerald-500 outline-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-all flex items-center justify-center gap-2">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-8 flex flex-col justify-center">
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-full text-emerald-400">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-bold text-lg">Call Us</h4>
                <p className="text-gray-400 text-sm">Mon-Sun from 10:30 Am to 8:00 Pm</p>
                <a href="tel:+919876543210" className="text-emerald-400 font-mono mt-1 block">+91 9663418188 </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-full text-emerald-400">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email Us</h4>
                <p className="text-gray-400 text-sm">For general & support queries</p>
                <a href="mailto:support@prakashtraders.com" className="text-emerald-400 mt-1 block">Ptindsupplier@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-full text-emerald-400">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-bold text-lg">Visit Us</h4>
                <p className="text-gray-400 text-sm mt-1">
                   No. 44, Patwa Plaza, M.G. Road,,<br />
                  Hosur - 635109
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;