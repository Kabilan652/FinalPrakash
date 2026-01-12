import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Award, Truck, ShieldCheck, 
  Factory, ArrowRight, MessageCircle, Star, Users, ExternalLink 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";


const AboutPage = () => {
  // State for scroll animation trigger (simple fade-in effect)
  const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate(); 

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { title: "Electronics", desc: "Cutting-edge smartphones, laptops, and smart gadgets." },
    { title: "Home Appliances", desc: "Refrigerators, washing machines, and kitchen essentials." },
    { title: "Furniture", desc: "Elegant and durable pieces for modern homes & offices." },
    { title: "Corporate Gifting", desc: "Premium solutions tailored for business excellence." }
  ];

  const stats = [
    { label: "Founded", value: "1984" },
    { label: "Reach", value: "Pan-India" },
    { label: "Experience", value: "40+ Years" },
    { label: "Support", value: "24/7 Service" }
  ];

  const features = [
    { icon: <Star className="w-6 h-6" />, title: "Premium Quality", desc: "Authorized dealers of top global brands." },
    { icon: <Truck className="w-6 h-6" />, title: "Fast Delivery", desc: "Secure shipping across the country." },
    { icon: <Users className="w-6 h-6" />, title: "Customer First", desc: "Dedicated support team for all your queries." },
  ];

  const electronicsImageUrl = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-blue-600 overflow-x-hidden">
      
      {/* --- Floating Contact Button (New) --- */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
        <a 
          href="https://wa.me/919663418188" // Example WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-full shadow-lg shadow-green-900/40 transition-all transform hover:scale-110 font-semibold"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden md:inline">Chat with Us</span>
        </a>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative py-24 px-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>

        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
            ESTABLISHED 1984
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            PRAKASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">TRADERS</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Building the future with trusted electronics and stylish living solutions. Experience quality that lasts generations.
          </p>
          
          {/* Interactive Buttons (New) */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/50 hover:shadow-blue-600/50"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 rounded-xl font-bold text-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              View Products
              <ExternalLink className="w-4 h-4" />
            </button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 border border-gray-800 rounded-2xl hover:border-blue-500/50 bg-gray-900/30 backdrop-blur-sm transition-all group hover:-translate-y-1">
                <p className="text-3xl md:text-4xl font-bold group-hover:text-blue-500 transition-colors">{stat.value}</p>
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Choose Us (New Interactive Strip) --- */}
      <section className="py-12 border-b border-gray-900 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-900 transition-colors cursor-default">
              <div className="p-3 bg-blue-900/20 rounded-lg text-blue-500">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Core Story Section --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start"> 
          
          {/* Left Column: Text Content */}
          <div className="order-2 md:order-1 pt-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-10 bg-blue-600 rounded-full block"></span> 
              Our Legacy
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Prakash Traders is a modern, customer-focused provider dedicated to delivering advanced, trusted, and value-driven solutions. 
              </p>
              <p>
                With our own <span className="text-blue-400 font-semibold">manufacturing capability</span>, strong wholesale network, and welcoming retail spaces, we bring high-quality products directly to homes and businesses alike.
              </p>
              <p>
                Our commitment is simple: to help individuals and enterprises live and work more comfortably, efficiently, and stylishly—today and for years to come.
              </p>
            </div>
          </div>

          {/* Right Column: Image and Categories Stack */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="relative group rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/20 cursor-pointer">
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img 
                src={electronicsImageUrl} 
                alt="Prakash Traders Electronics" 
                className="w-full h-72 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                <p className="text-sm font-semibold text-white">Latest Collection 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <div key={i} className="group bg-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-blue-500 hover:bg-blue-900/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-blue-500 font-bold mb-2 group-hover:text-blue-400">{cat.title}</h3>
                  <p className="text-sm text-gray-400 leading-snug group-hover:text-gray-300">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission & Vision Cards (Interactive) --- */}
      <section className="py-24 px-6 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
          {[
            { Icon: ShieldCheck, title: "Purpose", text: "Enhancing everyday living with trusted quality." },
            { Icon: Award, title: "Vision", text: "To be India’s most trusted lifestyle tech destination." },
            { Icon: Factory, title: "Mission", text: "Innovation, exceptional service, and value standards." }
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-3xl border border-gray-800 bg-black hover:bg-gray-900 hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-900/20 transition-all group duration-500">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <item.Icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Contact Footer (Clickable) --- */}
      <section id="contact-section" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row justify-between items-center gap-12 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
          
          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-md">Ready to upgrade your lifestyle? Experience technology made easy with Prakash Traders.</p>
              <button
                onClick={() => navigate("/contact")}
                className="bg-white text-blue-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Send us a Message
              </button>

          </div>

          <div className="space-y-4 w-full md:w-auto relative z-10">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all cursor-pointer border border-white/5">
              <div className="bg-white/20 p-3 rounded-full"><MapPin className="w-6 h-6 text-white" /></div>
              <span className="text-white font-medium">No. 44, Patwa Plaza, M.G. Road,<br/> Hosur - 635109</span>
            </a>
            
            <a href="mailto:Ptindsupplier@gmail.com" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all cursor-pointer border border-white/5">
              <div className="bg-white/20 p-3 rounded-full"><Mail className="w-6 h-6 text-white" /></div>
              <span className="text-white font-medium">Ptindsupplier@gmail.com</span>
            </a>

            <a href="tel:+919663418188" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all cursor-pointer border border-white/5">
              <div className="bg-white/20 p-3 rounded-full"><Phone className="w-6 h-6 text-white" /></div>
              <span className="text-white font-medium">+91 96634 18188 / 70410 51631</span>
            </a>
          </div>
        </div>
        
        <div className="text-center mt-12 text-gray-600 text-sm">
           © {new Date().getFullYear()} Prakash Traders. All rights reserved.
        </div>
      </section>
    </div>
  );
};

export default AboutPage;