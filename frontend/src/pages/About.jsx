import React from 'react';
import { Phone, Mail, MapPin, Award, Truck, ShieldCheck, Factory, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const categories = [
    { title: "Electronics", desc: "Cutting-edge smartphones, laptops, and smart gadgets." },
    { title: "Home Appliances", desc: "Refrigerators, washing machines, and kitchen essentials." },
    { title: "Furniture", desc: "Elegant and durable pieces for modern homes & offices." },
    { title: "Corporate Gifting", desc: "Premium solutions tailored for business excellence." }
  ];

  const stats = [
    { label: "Founded", value: "1983" },
    { label: "Reach", value: "Pan-India" },
    { label: "Experience", value: "40+ Years" },
    { label: "Support", value: "24/7 Service" }
  ];

  // Using a placeholder image that fits the electronics/dark theme
  const electronicsImageUrl = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-blue-600 overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative py-20 px-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            PRAKASH <span className="text-blue-600">TRADERS</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Building the future with trusted electronics and stylish living solutions since 1983.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 border border-gray-800 rounded-xl hover:border-blue-500 transition-colors group">
                <p className="text-3xl font-bold group-hover:text-blue-500">{stat.value}</p>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Core Story Section with Image --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        {/* changed items-center to items-start for better top alignment on desktop */}
        <div className="grid md:grid-cols-2 gap-12 items-start"> 
          
          {/* Left Column: Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="w-12 h-1 bg-blue-600 inline-block"></span> Our Legacy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              Prakash Traders is a modern, customer-focused provider dedicated to delivering advanced, trusted, and value-driven solutions. 
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              With our own **manufacturing capability**, strong wholesale network, and welcoming retail spaces, we bring high-quality products directly to homes and businesses alike.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our commitment is simple: to help individuals and enterprises live and work more comfortably, efficiently, and stylishly—today and for years to come.
            </p>
           
          </div>

          {/* Right Column: Image and Categories Stack */}
          <div className="order-1 md:order-2 space-y-8">
             {/* The New Electronics Image */}
            <div className="relative group rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/20">
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <img 
                    src={electronicsImageUrl} 
                    alt="Prakash Traders Electronics Section" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
            </div>

             {/* Existing Category Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, i) => (
                <div key={i} className="bg-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                    <h3 className="text-blue-500 font-bold mb-2">{cat.title}</h3>
                    <p className="text-sm text-gray-400 leading-snug">{cat.desc}</p>
                </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission & Vision Cards --- */}
      <section className="py-20 px-6 bg-gray-950 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
          <div className="p-8 rounded-3xl border border-gray-800 bg-black hover:bg-gray-900 transition-all group">
            <ShieldCheck className="text-blue-600 mb-4 w-10 h-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4">Purpose</h3>
            <p className="text-gray-400">To enhance everyday living by providing trusted, high-quality electronics and furniture that bring comfort to homes across India.</p>
          </div>
          <div className="p-8 rounded-3xl border border-gray-800 bg-black hover:bg-gray-900 transition-all group">
            <Award className="text-blue-600 mb-4 w-10 h-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4">Vision</h3>
            <p className="text-gray-400">To be India’s most trusted destination for lifestyle tech, setting benchmarks for quality, innovation, and expansion.</p>
          </div>
          <div className="p-8 rounded-3xl border border-gray-800 bg-black hover:bg-gray-900 transition-all group">
            <Factory className="text-blue-600 mb-4 w-10 h-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-gray-400">Delivering innovative products with exceptional service while introducing our own branded range to set new value standards.</p>
          </div>
        </div>
      </section>

      {/* --- Contact Footer --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-blue-900/30">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Get In Touch</h2>
            <p className="text-blue-100">Experience technology made easy with Prakash Traders.</p>
          </div>
          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-center gap-3 bg-blue-700/50 p-3 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-200" /> 
              <span>No. 44, Patwa Plaza, M.G. Road, Hosur - 635109</span>
            </div>
            <div className="flex items-center gap-3 bg-blue-700/50 p-3 rounded-xl">
              <Mail className="w-5 h-5 text-blue-200" /> 
              <span>Ptindsupplier@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 bg-blue-700/50 p-3 rounded-xl">
              <Phone className="w-5 h-5 text-blue-200" /> 
              <span>+91 96634 18188 / +91 70410 51631</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;