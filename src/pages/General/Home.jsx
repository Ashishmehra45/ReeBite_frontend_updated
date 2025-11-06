import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Import icons for the UI
import { FiHeart, FiBookmark, FiMessageCircle, FiHome, FiBookOpen } from "react-icons/fi";


const Home = () => {
    
 const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://reebite-backend.onrender.com/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.fooditem);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // user not logged in
          navigate("/user/login");
        } else {
          console.error(err);
        }
      });
  }, [navigate]);

    async function onclicklike(item) {
        try {
            const response = await axios.post(
                "https://reebite-backend.onrender.com/api/food/like",
                { foodId: item._id },
                { withCredentials: true }
            );

            const { isLiked, likecount } = response.data;

            if (isLiked !== undefined) {
                console.log(isLiked ? "Video liked" : "Video unliked");

                setVideos((prev) =>
                    prev.map((v) =>
                        v._id === item._id
                            ? {
                                ...v,
                                likecount: likecount,
                                isLiked: isLiked
                            }
                            : v
                    )
                );
            } else {
                console.error("Backend did not return 'isLiked' status.");
            }

        } catch (error) {
            console.error("Error liking video:", error);
        }
    }

    async function onclicksave(item) {
        try {
            const response = await axios.post(
                "https://reebite-backend.onrender.com/api/food/save",
                { foodId: item._id }, // Data payload
                { withCredentials: true } // Config object
            );

            // Backend must return 'isSaved' status (true/false)
            const { isSaved } = response.data;

            if (isSaved !== undefined) {
                console.log(isSaved ? "Video saved" : "Video unsaved");

                // Update the state with the new isSaved status
                setVideos((prev) =>
                    prev.map((v) =>
                        v._id === item._id
                            ? {
                                ...v,
                                isSaved: isSaved
                            }
                            : v
                    )
                );
            } else {
                console.error("Backend did not return 'isSaved' status.");
            }

        } catch (error) {
            console.error("Error saving video:", error);
        }
    }

    const onclickcomment = (item) => {
        console.log(`Opening comments for Food ID: ${item._id}`);
    };


    return (
        // Main container for the scrolling feed
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
            {videos.map((video) => (
                // Video slide container
                <div
                    key={video._id}
                    className="relative h-screen w-full snap-start flex items-center justify-center"
                >
                    {/* Video Player (remains the same) */}
                    <video
                        src={video.Video}
                        loop
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                    />

                    {/* Video Text Overlay: Title/Description and Visit Store Button */}
                    <div className="absolute bottom-20 left-0 w-full px-5 text-white z-10">
                        {/* "description" area */}
                        <p className="text-base font-semibold mb-2">Description</p>
                        <p className="text-sm sm:text-base line-clamp-2 mb-4">
                            {video.description}
                        </p>

                      
                        <Link to={`/food-partner/${video.foodpartner}`} className="inline-block">
                            <button className="bg-red-800/80 hover:bg-red-800 text-white text-sm sm:text-base font-medium px-6 py-2 rounded-lg shadow-xl transition duration-200">
                                Visit Store
                            </button>
                        </Link>
                    </div>

                    
                    <div className="absolute bottom-1/4 right-5 flex flex-col items-center space-y-6 text-white z-10">

                        {/* 💖 LIKES */}
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => onclicklike(video)}
                                className="p-2 -m-2 focus:outline-none transition"
                                aria-label={video.isLiked ? "Unlike video" : "Like video"}
                            >
                                <FiHeart
                                    className={`w-8 h-8 cursor-pointer transition ${video.isLiked
                                        ? "text-red-500 fill-current"
                                        : "hover:text-red-500"
                                        }`}
                                />
                            </button>
                            <span className="text-xs mt-1">{video.likecount || 0}</span>
                        </div>


                        
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => onclicksave(video)} // 👈🏼 Call the save function
                                className="p-2 -m-2 focus:outline-none transition"
                                aria-label={video.isSaved ? "Unsave video" : "Save video"}
                            >
                                <FiBookmark
                                    className={`w-8 h-8 cursor-pointer transition ${video.isSaved
                                            ? "text-yellow-400 fill-current"
                                            : "hover:text-yellow-400"
                                        }`}
                                />
                            </button>
                            
                        </div>


                        
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => onclickcomment(video)}
                                className="p-2 -m-2 focus:outline-none transition"
                                aria-label="Open comments"
                            >
                                <FiMessageCircle className="w-8 h-8 cursor-pointer hover:text-blue-400 transition" />
                            </button>
                            <span className="text-xs mt-1">45</span>
                        </div>
                    </div>

                   
                    <div className="absolute inset-0 bg-black/30"></div>

                </div>
            ))}

           
            <nav className="fixed bottom-0 w-full bg-black/90 border-t border-gray-700 h-16 flex justify-around items-center z-20">
                {/* Home Link/Icon */}
                <Link to="/" className="flex flex-col items-center text-white p-2">
                    <FiHome className="w-6 h-6" />
                    <span className="text-xs mt-1">home</span>
                </Link>

               
                <Link to="/saved" className="flex flex-col items-center text-white/70 hover:text-white p-2 transition">
                    <FiBookOpen className="w-6 h-6" />
                    <span className="text-xs mt-1">saved</span>
                </Link>
            </nav>
        </div>
    );
};

export default Home;