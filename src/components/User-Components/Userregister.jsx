import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Floating bounce animation
const floating = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Userregister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { fullname, email, password },
        { withCredentials: true }
      );

      setSuccess("✅ User registered successfully!");
      console.log(response.data);
      setTimeout(() => navigate("/user/login"), 1000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("⚠️ User already registered!");
      } else {
        setError("❌ Something went wrong. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-sm w-full p-8 space-y-5 bg-white rounded-2xl shadow-xl border border-amber-200"
      >
        {/* 🍔 Small floating food icons inside card */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="burger"
          className="w-8 absolute top-3 left-4 opacity-80"
          variants={floating}
          animate="animate"
        />
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/1404/1404945.png"
          alt="pizza"
          className="w-7 absolute top-3 right-4 opacity-80"
          variants={floating}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="fries"
          className="w-7 absolute bottom-3 left-5 opacity-80"
          variants={floating}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
          alt="drink"
          className="w-6 absolute bottom-3 right-5 opacity-80"
          variants={floating}
          animate="animate"
          transition={{ delay: 1.5 }}
        />

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-orange-600 flex items-center justify-center gap-1">
            🍽️ ReeBite
          </h1>
          <p className="text-gray-500 text-sm">
            Join the family of flavor lovers!
          </p>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-3 text-sm rounded-md text-center bg-red-100 text-red-700 border border-red-300"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-3 text-sm rounded-md text-center bg-green-100 text-green-700 border border-green-300"
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={HandleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="user@reebite.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f97316",
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-400 shadow-md hover:shadow-lg focus:ring-2 focus:ring-orange-400"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already a member?{" "}
          <a
            href="/user/login"
            className="font-medium text-orange-500 hover:text-orange-400 transition"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Userregister;
