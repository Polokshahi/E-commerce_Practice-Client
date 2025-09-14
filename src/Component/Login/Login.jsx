import { Link } from "react-router";

const Login = () => {
  return (
    // ✅ Full viewport height & no scrollbar
    <div className="flex items-center justify-center mt-3 mb-3 bg-white px-4 sm:px-6 md:px-8 overflow-hidden ">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
          Login
        </h2>

        <form className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Remember & Forgot */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm">
            <label className="flex items-center space-x-2 mb-2 sm:mb-0">
              <input type="checkbox" className="form-checkbox text-green-600" />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md shadow transition-colors duration-200">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link className="text-green-700 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
