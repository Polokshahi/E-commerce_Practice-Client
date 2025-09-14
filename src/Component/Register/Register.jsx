import { Link } from "react-router";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white px-3">
      <div className="w-full max-w-sm p-5 space-y-5 bg-white rounded-lg shadow">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-black text-center">
          Sign Up
        </h2>

        {/* Form */}
        <form className="space-y-3">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Date of Birth */}
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-md shadow transition-colors duration-200 text-sm"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
