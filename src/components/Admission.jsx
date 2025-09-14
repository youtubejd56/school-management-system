import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_num: '',
    student_name: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/admission/', formData);
      alert('Submitted Successfully!');
      console.log(response.data);

      // ✅ Reset form after submission
      setFormData({
        phone_num: '',
        student_name: '',
        address: '',
      });

    } catch (error) {
      console.error('Error submitting admission form:', error);
      alert('Submission failed!');
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="w-full bg-grey-500">
      <div className="container mx-auto py-8">
        <div className="w-96 mx-auto bg-gray-100 rounded shadow">
          <div className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-grey-500">
            Student Application
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-4">
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleChange}
                placeholder="Enter your Number"
                required
                className="border rounded w-full py-2 px-3 text-grey-darker"
              />
            </div>

            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Student Name</label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                placeholder="Enter your Name"
                required
                className="border rounded w-full py-2 px-3 text-grey-darker"
              />
            </div>

            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your Address"
                required
                className="border rounded w-full py-2 px-3 text-grey-darker"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 py-2 px-5 text-white font-semibold hover:bg-blue-500"
            >
              Submit
            </button>

            <button
              type="button"
              className="ml-3 px-5 py-2 text-white font-semibold bg-cyan-700 hover:bg-red-500"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;
