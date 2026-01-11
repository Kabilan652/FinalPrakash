import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Import Link to prevent page reload
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  // 🔹 Helper: Scroll to top when a link is clicked
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Helper: Handle Newsletter Submit
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}! (Connect this to your backend)`);
      setEmail("");
    }
  };

  // --- DATA LINKS CONFIGURATION ---
  // ✅ Organized data makes it easier to manage
  const usefulLinks = [
    { name: "About Prakash Traders", path: "/about" },
    { name: "Contact / Support", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Buying Guide", path: "/buying-guide" },
    { name: "Return Policy", path: "/return-policy" },
    { name: "Store Locator", path: "/about" },
  ];

  const policyLinks = [
    { name: "Careers", path: "/careers" },
    { name: "Terms of Use", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  // ✅ Matches your Navbar routes
  const productLinks = [
    { name: "Refrigerators", path: "/products/refrigerators" },
    { name: "Washing Machines", path: "/products/washing-machines" },
    { name: "Microwaves", path: "/products/microwaves" },
    { name: "Mixers & Grinders", path: "/products/mixers" },
    { name: "Chimneys", path: "/products/chimneys" },
    { name: "Rice Cookers", path: "/products/e-rice-cookers" },
  ];

  return (
    <footer className="bg-zinc-900 text-white mt-auto border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* ================= COLUMN 1: CONNECT & NEWSLETTER ================= */}
          <div className="space-y-6 md:border-r md:border-zinc-800 md:pr-6">
            <div>
              <h5 className="text-sm font-bold tracking-widest text-emerald-400 mb-4">
                STAY CONNECTED
              </h5>
              <p className="text-xs text-gray-400 mb-4">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-emerald-500 focus:outline-none text-sm transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded transition-colors uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 pt-2">
              <SocialIcon Icon={FaFacebookF} link="https://facebook.com" color="hover:text-blue-500" />
              <SocialIcon Icon={FaInstagram} link="https://instagram.com" color="hover:text-pink-500" />
              <SocialIcon Icon={FaLinkedin} link="https://linkedin.com" color="hover:text-blue-400" />
              <SocialIcon Icon={FaTwitter} link="https://twitter.com" color="hover:text-sky-400" />
              <SocialIcon Icon={FaYoutube} link="https://youtube.com" color="hover:text-red-500" />
            </div>

            <p className="text-[10px] text-gray-500 pt-4">
              © {new Date().getFullYear()} Prakash Traders. All rights reserved.
            </p>
          </div>

          {/* ================= COLUMN 2: USEFUL LINKS ================= */}
          <div className="grid grid-cols-2 gap-6 md:border-r md:border-zinc-800 md:px-6">
            {/* SUB-COLUMN A */}
            <div>
              <h5 className="text-sm font-bold tracking-widest text-emerald-400 mb-4">HELP & INFO</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {usefulLinks.map((item) => (
                  <li key={item.name}>
                    {/* ✅ Uses Link + ScrollTop */}
                    <Link 
                      to={item.path} 
                      onClick={handleScrollTop}
                      className="hover:text-white hover:pl-1 transition-all duration-200 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUB-COLUMN B */}
            <div>
              <h5 className="text-sm font-bold tracking-widest text-emerald-400 mb-4">POLICIES</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {policyLinks.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      onClick={handleScrollTop}
                      className="hover:text-white hover:pl-1 transition-all duration-200 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= COLUMN 3: PRODUCTS ================= */}
          <div className="md:pl-6">
            <h5 className="text-sm font-bold tracking-widest text-emerald-400 mb-4">POPULAR PRODUCTS</h5>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    onClick={handleScrollTop}
                    className="hover:text-white transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

// 🔹 Sub-component for Social Icons to keep code clean
const SocialIcon = ({ Icon, link, color }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 bg-zinc-800 rounded-full transition-all duration-300 ${color} hover:bg-white`}
  >
    <Icon className="w-4 h-4" />
  </a>
);

export default Footer;