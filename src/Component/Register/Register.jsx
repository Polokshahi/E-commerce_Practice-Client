import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../../AuthProvider/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const first_name = form.first_name.value.trim();
    const last_name = form.last_name.value.trim();
    const date_of_birth = form.date_of_birth.value;
    const email = form.email.value.trim();
    const password = form.password.value;

    // Check age >= 18
    const dob = new Date(date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      alert("You must be at least 18 years old to register.");
      return;
    }

    // Password validation regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number."
      );
      return;
    }

    // Register user
    register(email, password, first_name, last_name)
      .then((result) => {
        console.log("Firebase user created:", result.user);

        // Save user info to MongoDB via backend
        return axios.post("http://localhost:3000/users", {
          uid: result.user.uid,
          email,
          first_name,
          last_name,
          date_of_birth,
          Role: "user",
        });
      })
      .then((res) => {
        console.log("User saved in MongoDB:", res.data);
        alert("Registration successful! Data saved to database.");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        alert("Registration failed. Check console for details.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white px-3">
      <div className="w-full max-w-sm p-5 space-y-5 bg-white rounded-lg shadow">
        <h2 className="text-xl sm:text-2xl font-bold text-black text-center">
          Sign Up
        </h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <input type="text" name="first_name" placeholder="First Name" className="w-full px-3 py-2 border rounded-md text-sm" />
          <input type="text" name="last_name" placeholder="Last Name" className="w-full px-3 py-2 border rounded-md text-sm" />
          <input type="email" name="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md text-sm" />
          <input type="date" name="date_of_birth" className="w-full px-3 py-2 border rounded-md text-sm" />
          <input type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md text-sm" />

          <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md text-sm">
            Sign Up
          </button>
        </form>

        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
