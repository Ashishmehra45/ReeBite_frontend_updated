import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Userlogin from "../components/User-Components/UserLogin";
import Userregister from "../components/User-Components/UserRegister";
import FoodPartnerlogin from "../components/Foodpartner-Componets/FoodPartnerlogin";
import FoodPartnerregister from "../components/Foodpartner-Componets/FoodPartnerregister";
import Home from "../pages/General/Home";
import CreateFood from "../Foodpartner/CreateFood";
import ProfileLayout from "../Foodpartner/ProfileLayout";
import Saved from "../pages/General/Saved";
function AppRoutes() {
  return (
    <div>
      
        <Routes>
          <Route path="/user/register" element={<Userregister />}></Route>
          <Route path="/user/login" element={<Userlogin />}></Route>
          <Route
            path="/foodpartner/register"
            element={<FoodPartnerregister />}
          ></Route>
          <Route path="/foodpartner/login"
            element={<FoodPartnerlogin />}
          ></Route>
          <Route 
          path="/" element={<Home/>}
          ></Route>
        <Route path="/CreateFood" element={<CreateFood/>}></Route>
        <Route path="/food-partner/:id" element={<ProfileLayout/>}></Route>
        <Route path="/saved" element={<Saved/>}></Route>
        </Routes>
     
    </div>
  );
}

export default AppRoutes;
