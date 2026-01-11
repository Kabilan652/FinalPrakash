import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { useContext } from "react";
import { ContextProvider } from "./Context/Context";

const App = () => {
  const location = useLocation();
  const { role } = useContext(ContextProvider);

  // ✅ Hide layout ONLY for admin dashboard
  const hideLayout =
    role === "admin" && location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideLayout && <Navbar />}
      <AllRoutes />
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
