import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextProvider } from "../../Context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
    const API = import.meta.env.VITE_API_URL;


  // ✅ USE ONLY login()
  const { login } = useContext(ContextProvider);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API}/api/auth/admin-login/`,
        { username, password }
      );

      if (response.data.success) {
        // ✅ SINGLE SOURCE OF TRUTH
        login(response.data.token, "admin");

        setIsLoading(false);
        setIsRedirecting(true);

        // Professional redirect delay
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1500);
      } else {
        setError(response.data.message || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">

      {/* FULL SCREEN LOADER */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <AiOutlineLoading3Quarters className="text-emerald-500 animate-spin text-6xl mb-6" />
            <h2 className="text-white text-2xl font-bold tracking-widest uppercase">
              Preparing Dashboard
            </h2>
            <p className="text-gray-500 mt-2">Securing your session...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN CARD */}
      <div className="relative bg-[#111] border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">

        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Admin <span className="text-emerald-500">Portal</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            required
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl text-white"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl text-white"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || isRedirecting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex justify-center"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
