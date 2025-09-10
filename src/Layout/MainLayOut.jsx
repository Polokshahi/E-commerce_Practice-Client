// MainLayOut.jsx
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import { Outlet } from "react-router";

const MainLayOut = () => {
  return (
    <div>
      {/* Fixed Navbar */}
      <header className="">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="pt-[350px] md:pt-[200px] pb-[100px] min-h-screen">
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayOut;
