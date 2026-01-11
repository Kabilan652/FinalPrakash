import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";

const StoreLocator = () => {
  const stores = [
    {
      id: 1,
      name: "Prakash Traders - Main Branch",
      address: "123, Gandhi Road, Near Bus Stand, Hosur, Tamil Nadu - 635109",
      phone: "+91 98765 43210",
      hours: "9:00 AM - 9:00 PM",
      mapLink: "https://goo.gl/maps/example"
    },
    {
      id: 2,
      name: "Prakash Traders - Electronics Hub",
      address: "45, Sipcot Phase 1, Opposite IT Park, Hosur, Tamil Nadu - 635126",
      phone: "+91 99887 76655",
      hours: "10:00 AM - 9:30 PM",
      mapLink: "https://goo.gl/maps/example"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-[100px] pb-10 px-5">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-emerald-400" /> Find Our Stores
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-emerald-500 transition-colors">
              <h2 className="text-xl font-bold text-white mb-4">{store.name}</h2>
              
              <div className="space-y-3 text-sm text-gray-400">
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-emerald-400" />
                  {store.address}
                </p>
                <p className="flex items-center gap-3">
                  <FaPhoneAlt className="text-emerald-400" />
                  {store.phone}
                </p>
                <p className="flex items-center gap-3">
                  <FaClock className="text-emerald-400" />
                  {store.hours}
                </p>
              </div>

              <a 
                href={store.mapLink} 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 block w-full text-center bg-gray-800 hover:bg-emerald-600 hover:text-white text-gray-300 py-2 rounded transition-all font-semibold"
              >
                View on Google Maps
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;