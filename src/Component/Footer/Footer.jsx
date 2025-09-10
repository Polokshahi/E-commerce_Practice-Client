import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show button when scroll is 300px down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white border-t relative">
      {/* Subscribe Section */}
      <div className="border-b px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <span className="text-xl">✉</span>
          <span>Subscribe for news and Offers</span>
        </div>
        <div className="flex w-full md:w-1/3">
          <input
            type="email"
            placeholder="Enter your email."
            className="input input-bordered rounded-r-none w-full"
          />
          <button className="btn bg-green-600 text-white rounded-l-none hover:bg-green-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-10 border-b">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
            <span className="text-black">🛒</span> ISSHUE
          </div>
          <p className="mt-2 text-gray-600 text-sm">
            Isshue Multistore E-Commerce system.
          </p>
          <p className="mt-2 text-sm text-gray-500">Address: New York, USA</p>
          <p className="text-sm text-gray-500">Mobile: +00-000-00000</p>
          <p className="text-sm text-gray-500">Email: abc@gmail.com</p>
          <p className="text-sm text-gray-500">Website: https://abc.com</p>
        </div>

        {/* Our Communities */}
        <div>
          <h3 className="font-semibold mb-3 border-l-2 border-green-600 pl-2">
            Our Communities
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaFacebookF className="text-blue-600" /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-pink-500" /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedinIn className="text-blue-700" /> Linkedin
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube className="text-red-600" /> Youtube
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold mb-3 border-l-2 border-green-600 pl-2">
            Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Track My Order</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="font-semibold mb-3 border-l-2 border-green-600 pl-2">
            Download The App
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Get access to all exclusive offers, discounts and deals by download
            our App!
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="w-32 cursor-pointer"
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 text-sm text-gray-600">
        <p>
          Developed by{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Polok Shahi
          </a>
        </p>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <span>Pay With :</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="MasterCard"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Visa_logo.png"
            alt="Visa"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="h-6"
          />
          <img
            src="https://download.logo.wine/logo/BKash/BKash-Logo.wine.png"
            alt="bKash"
            className="h-6"
          />
        </div>
      </div>

      {/* Scroll To Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
