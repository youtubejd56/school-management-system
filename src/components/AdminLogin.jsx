import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Images10 from "../assets/admin1.png";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin-login/", {
        username,
        password,
      });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      alert("Admin Login Successful!");
      navigate("/admin-dashboard");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Illustration */}
      <div className="w-1/2 bg-indigo-100 flex items-center justify-center">
        <img src={Images10} alt="Admin Login Illustration" className="w-6/2 md:w-3/5" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-2 rounded-full hover:bg-blue-800 transition"
            >
              LOGIN
            </button>

            {error && (
              <p className="text-red-500 text-center text-sm font-medium bg-amber-200">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
