import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FoodPartnerregister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const contact = e.target.contact.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "https://reebite-backend.onrender.com/api/auth/food-partner/register",
        { name, email, contact, address, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/foodpartner/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-200">
      <div className="relative max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* ✨ Animated Food Items */}
        <motion.img
          initial={{ y: -15 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="burger"
          className="absolute w-10 top-4 left-6 opacity-70"
        />

        <motion.img
          initial={{ y: -15 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="pizza"
          className="absolute w-9 top-3 right-5 opacity-70"
        />

        <motion.img
          initial={{ y: -15 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
          src="https://cdn-icons-png.flaticon.com/512/135/135620.png"
          alt="cold drink"
          className="absolute w-9 bottom-5 left-7 opacity-70"
        />

        <motion.img
          initial={{ y: -15 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
          src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
          alt="fries"
          className="absolute w-10 bottom-4 right-6 opacity-70"
        />

        {/* 🧾 Form */}
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6 relative z-10">
          🍽️ Food Partner Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input required id="name" name="name" type="text" placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required id="email" name="email" type="email" placeholder="partner@restaurant.com"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input required id="contact" name="contact" type="tel" placeholder="Enter your contact number"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea required id="address" name="address" placeholder="Enter your restaurant address" rows="3"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input required id="password" name="password" type="password" placeholder="••••••••"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-semibold bg-orange-500 hover:bg-orange-600 shadow-md transform hover:scale-105 transition"
          >
            Register Partner
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4 relative z-10">
          Already have an account?{" "}
          <a href="/foodpartner/login" className="font-medium text-orange-600 hover:text-orange-500">
            Login here
          </a>
        </p>

      </div>
    </div>
  );
};

export default FoodPartnerregister;
