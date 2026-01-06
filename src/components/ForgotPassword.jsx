import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://127.0.0.1:8000/api/admin-forgot-password/", { email });
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setMessage("Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Forgot Password</h2>

        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-bold py-2 rounded-full hover:bg-blue-800 transition"
          >
            Send Reset Link
          </button>

          {message && (
            <p className="text-center text-sm font-medium text-blue-800 bg-blue-100 py-2 rounded">
              {message}
            </p>
          )}

          <div className="text-center mt-4">
            <Link to="/admin-login" className="text-blue-500 text-sm hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
