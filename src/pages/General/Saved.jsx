import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// In-line SVG Home Icon
const HomeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// In-line SVG Saved Icon
const SavedIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSavedVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food/save",
          { withCredentials: true }
        );

        const fetchedData = response.data.savefood;

        if (Array.isArray(fetchedData)) {
          const flattenedVideos = fetchedData
            .filter((item) => item?.food)
            .map((item) => ({
              _id: item.food._id,
              Video: item.food.Video,
              Thumbnail: item.food.Thumbnail,
              description: item.food.description,
              likecount: item.food.likecount || 0,
            }));

          if (isMounted) {
            setSavedVideos(flattenedVideos);
            setError(null);
            console.log("✅ Saved Videos Loaded:", flattenedVideos);
          }
        } else {
          if (isMounted) setSavedVideos([]);
        }
      } catch (err) {
        console.error("❌ Error fetching saved videos:", err);
        if (isMounted) {
          setError("Failed to fetch saved videos. Server connection problem.");
          setSavedVideos([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSavedVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        Loading Saved Content... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full bg-black text-white pt-20 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black text-white pt-4 pb-16 overflow-y-scroll">
      <h1 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-3 mx-4">
        Saved Videos ({savedVideos.length})
      </h1>

      <div className="grid grid-cols-3 gap-1 p-1">
        {savedVideos.length > 0 ? (
          savedVideos.map((video) => (
            <div
              key={video._id}
              onMouseEnter={() => setHoveredVideoId(video._id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              className="w-full relative overflow-hidden group aspect-[9/16]"
            >
              <video
                src={video.Video}
                muted
                loop
                playsInline
                poster={video.Thumbnail}
                className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
                ref={(el) => {
                  if (el) {
                    if (hoveredVideoId === video._id) el.play();
                    else el.pause();
                  }
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.poster = `https://placehold.co/100x178/333333/ffffff?text=No+Preview`;
                }}
              />

              {/* Overlay text */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs p-1 text-center transition">
                {video.description
                  ? video.description.substring(0, 30) + "..."
                  : "No description"}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-400">
            You haven't saved any videos yet. 🥺
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 w-full bg-black/90 border-t border-gray-700 h-16 flex justify-around items-center z-20">
        <Link
          to="/"
          className="flex flex-col items-center text-white/70 hover:text-white p-2 transition"
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">home</span>
        </Link>

        <Link to="/saved" className="flex flex-col items-center text-white p-2">
          <SavedIcon className="w-6 h-6" />
          <span className="text-xs mt-1">saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Saved;
