import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [Video, setVideo] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    axios
      .get(`https://reebite-backend.onrender.com/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.foodPartner);

        if (Array.isArray(res.data.foodItems)) {
          setVideo(res.data.foodItems);
        } else {
          setVideo([]);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleMouseEnter = (itemId) => {
    setActiveVideoId(itemId);
  };

  const handleMouseLeave = (itemId) => {
    setActiveVideoId(null);
  };

 
  useEffect(() => {
    const videoContainers = document.querySelectorAll(".video-item");

    videoContainers.forEach((videoDiv) => {
      const video = videoDiv.querySelector("video");
      const itemId = videoDiv.getAttribute("data-item-id");

      if (!video) return;

      if (itemId === activeVideoId) {
        // Play the active video
        video.play().catch((error) => {
          console.warn("Autoplay was prevented by the browser:", error);
        });
      } else {
       
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeVideoId, Video]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50/50">
        <p className="text-2xl font-bold text-orange-600 animate-bounce">
          Chef Is Cooking... Loading Profile 🧑‍🍳
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-red-50 to-orange-100 text-gray-800 font-sans">
      <header
        className="p-5 sm:p-6 rounded-3xl mb-8 shadow-xl relative overflow-hidden 
                  bg-white/80 backdrop-blur-sm border border-orange-200/50"
      >
        <div className="absolute inset-0 bg-pink-100/30 blur-2xl opacity-50"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-pink-500/80 flex-shrink-0 bg-cover bg-center shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              backgroundImage: `url('/WhatsApp Image 2025-10-14 at 19.12.31_cd3b4043.jpg')`,
              backgroundColor: "#f7f7f7", 
            }}
          ></div>

          <div className="flex flex-col space-y-3 sm:space-y-4 flex-grow text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 transform hover:scale-105 transition-transform duration-200">
              {profile?.name || "Delicious Bites"} 🍽️
            </h1>
            <p className="text-lg text-gray-600">
              {profile?.address || "Foodie Lane, Gourmet City"}
            </p>
            <button
              className="mt-4 py-2 px-8 rounded-full font-bold text-lg
                                                bg-gradient-to-r from-pink-500 to-red-500
                         hover:from-pink-600 hover:to-red-600
                         text-white shadow-lg transform hover:scale-110 transition-all duration-300 self-center sm:self-start"
            >
              Follow ❤️
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section: Soft pastel cards */}
      <section
        className="flex justify-around items-center p-5 rounded-2xl mb-8 text-center shadow-lg 
                  bg-white border border-yellow-200"
        // Removed style attribute ❌
      >
        <div className="transition-transform duration-300 hover:scale-110">
          <p className="text-sm uppercase opacity-80 text-gray-500 mb-1">
            Total Meals
          </p>
          <p className="text-3xl font-extrabold text-orange-500">
            {profile?.totalMeals || 0}
          </p>
        </div>
        <div className="transition-transform duration-300 hover:scale-110">
          <p className="text-sm uppercase opacity-80 text-gray-500 mb-1">
            Customers Served
          </p>
          <p className="text-3xl font-extrabold text-pink-500">
            {profile?.customersServed || 0}
          </p>
        </div>
      </section>

      {/* Video Grid Section */}
      <section>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600">
          Our Delicious Creations 😋
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 rounded-3xl shadow-2xl 
                  bg-white/70 backdrop-blur-sm border border-yellow-300"
          // Removed style attribute ❌
        >
          {Video.length > 0 ? (
            Video.map((item, index) => (
              <div
                key={item._id || index}
                data-item-id={item._id || index}
                className="video-item relative flex flex-col bg-white rounded-xl overflow-hidden group 
                              transform hover:scale-[1.05] transition-transform duration-300 shadow-xl hover:shadow-2xl hover:shadow-pink-300/50"
                onMouseEnter={() => handleMouseEnter(item._id || index)}
                onMouseLeave={() => handleMouseLeave(item._id || index)}
              >
                <div className="absolute top-2 right-2 p-2 rounded-full bg-red-500/90 text-white text-xs font-bold shadow-lg animate-pulse z-10">
                  🔥 HOT!
                </div>

                <video
                  src={item.Video}
                  muted
                  loop
                  className="aspect-video w-full object-cover rounded-t-xl"
                />

                {/* Title and Description */}
                <div className="p-3 bg-red-50/50">
                  <p className="text-gray-900 text-lg font-bold truncate">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm truncate">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-xl font-medium py-10">
              No delicious creations to show yet. 🥺
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfileLayout;
