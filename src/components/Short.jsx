import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/shorts/";

const Short = () => {
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVideoUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("video/")) {
      setError("❌ Please upload a valid video file!");
      return;
    }
    if (selectedFile.size > 30 * 1024 * 1024) {
      setError("❌ File size must be less than 30MB!");
      return;
    }

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);
      if (videoElement.duration > 120) {
        setError("❌ Video must be less than 2 minutes!");
        return;
      }
      setError("");
      setVideo(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    };

    videoElement.src = URL.createObjectURL(selectedFile);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setFile(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wordCount = caption.trim().split(/\s+/).length;

    if (!file) {
      alert("Please upload a video before submitting.");
      return;
    }

    if (!caption.trim()) {
      alert("Please enter a caption.");
      return;
    }

    if (wordCount > 30) {
      alert("❌ Caption must not exceed 30 words.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("video", file);

    try {
      setLoading(true);
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Video uploaded successfully!");
      handleRemoveVideo();
      setTitle("");
      setCaption("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload video!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Upload Short Video 🎥
        </h2>

        {/* Upload Section */}
        {!video ? (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:bg-gray-50">
            <Upload size={40} className="text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">
              Click or drag & drop to upload
            </p>
            <p className="text-sm text-gray-400">
              MP4, MOV • Max 30MB • Max 2 minutes
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative">
            <video
              src={video}
              controls
              className="w-full rounded-xl max-h-96 object-cover"
            />
            <button
              onClick={handleRemoveVideo}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 font-medium mt-2 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter video title..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Caption / Description
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
              placeholder="Write something about your short..."
              required
            ></textarea>
            <p
              className={`text-sm mt-1 ${
                caption.trim().split(/\s+/).length > 30
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {caption.trim().split(/\s+/).length} / 30 words
            </p>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/videos")}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                View Uploaded Videos
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Short;
