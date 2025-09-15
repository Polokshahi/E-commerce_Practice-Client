import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; 
import AuthContext from "../../AuthProvider/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setLoading(true);
    login(email, password)
      .then(() => {
        toast.success("Login successful!", { position: "top-right" });
        navigate("/"); // redirect to home
      })
      .catch((error) => {
        toast.error(error.message || "Login failed", { position: "top-right" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center mt-3 mb-3 bg-white px-4 sm:px-6 md:px-8 overflow-hidden">
      <Toaster />
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm">
            <label className="flex items-center space-x-2 mb-2 sm:mb-0">
              <input type="checkbox" className="form-checkbox text-green-600" />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md shadow transition-colors duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
