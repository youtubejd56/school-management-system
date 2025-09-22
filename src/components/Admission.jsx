import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Use env variable for API base
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_URL = `${API_BASE}/api/admission/`;

const Admission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_num: "",
    student_name: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      alert("✅ Submitted Successfully!");
      console.log(response.data);

      // Reset form after submission
      setFormData({
        phone_num: "",
        student_name: "",
        address: "",
      });
    } catch (error) {
      console.error("❌ Error submitting admission form:", error);
      alert("Submission failed! Please try again.");
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className=" bg-white md:bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full max-w-md md:bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-center py-4 px-6 text-black text-xl sm:text-2xl font-bold border-b border-gray-300">
          Student Application
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_num"
              value={formData.phone_num}
              onChange={handleChange}
              placeholder="Enter your Number"
              required
              className="border rounded w-full py-2 px-3 sm:px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-semibold mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              placeholder="Enter your Name"
              required
              className="border rounded w-full py-2 px-3 sm:px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-semibold mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Address"
              required
              className="border rounded w-full py-2 px-3 sm:px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 py-2 px-4 text-white font-semibold rounded hover:bg-blue-500 transition"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleGoBack}
              className="flex-1 bg-cyan-700 py-2 px-4 text-white font-semibold rounded hover:bg-red-500 transition"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admission;
