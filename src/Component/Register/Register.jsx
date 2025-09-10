import React from "react";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] bg-white px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
          Sign Up
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Date of Birth */}
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md shadow transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
