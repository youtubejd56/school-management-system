import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Use environment variable or fallback
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_URL = `${API_BASE}/api/shorts/`;

const VideoUpload = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch uploaded videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get(API_URL);
      setVideos(response.data);
    } catch (err) {
      console.error("❌ Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Delete a video
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`${API_URL}${id}/`);
      setVideos((prev) => prev.filter((video) => video.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete video:", err);
      alert("Failed to delete video!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Uploaded Short Videos 🎬
        </h2>
        <button
          onClick={() => navigate("/shorts")}
          className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back to Upload
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-600">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {videos.map((video) => {
            const isValidDate =
              video.created_at && !isNaN(Date.parse(video.created_at));

            return (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col relative"
              >
                <video
                  src={
                    video.video.startsWith("http")
                      ? video.video
                      : `${API_BASE}${video.video}`
                  }
                  controls
                  className="rounded-lg w-full max-h-60 object-cover"
                />
                <h3 className="mt-3 font-semibold text-gray-800">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">{video.caption}</p>

                <p className="text-gray-400 text-xs mt-2">
                  {isValidDate ? (
                    <>Uploaded on {new Date(video.created_at).toLocaleString()}</>
                  ) : video.created_at ? (
                    <>Unrecognized date: {video.created_at}</>
                  ) : (
                    <>Upload date not provided</>
                  )}
                </p>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition"
                  >
                    🗑️ Delete Video
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
