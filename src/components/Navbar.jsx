import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/ths_logo.jpg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div className="bg-cyan-700 w-full h-16 px-8 flex items-center justify-between z-30 relative">
        {/* Logo + Title */}
        <div className="flex items-center gap-6">
          <img className="w-14 h-14 rounded-sm" src={Logo} alt="govt ths logo" />
          <h1 className="font-bold text-white text-lg md:text-2xl">
            GOVT.THS.PALA
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="space-x-4 flex">
            {["/", "/admission", "/event", "/shorts", "/adminlogin"].map((path, idx) => {
              const labels = ["Home", "Admission", "Event", "Shorts", "Admin Login"];
              return (
                <li key={idx} className="hover:text-[#bebebee0] text-white font-semibold">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 text-white/80"
                        : "text-white"
                    }
                    to={path}
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-40"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <svg
            className="w-10 h-10"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="64px"
            height="64px"
          >
            <path d="M7 29v5l50 1v-7L7 29zM7 11v6h50v-6H7zM7 46v7l50-1v-5L7 46z" />
          </svg>
        </button>
      </div>

      {/* Background Overlay */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* Animated Mobile Menu */}
      <div
        className={`bg-cyan-900 fixed top-0 right-0 w-2/3 h-full flex flex-col justify-center items-center transform transition-transform duration-600 ease-in-out z-30 md:hidden ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <svg
          width="40"
          height="40"
          className="absolute top-5 right-10 hover:scale-110 transition-transform duration-200 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOpenMenu(false)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#fff"
          />
        </svg>

        {/* Mobile Navigation Links */}
        <nav className="block">
          <ul className="my-10 flex flex-col gap-y-6 text-center text-lg text-white font-semibold">
            {[
              { label: "Home", path: "/" },
              { label: "Admission", path: "/admission" },
              { label: "Event", path: "/event" },
              { label: "Shorts", path: "/shorts" },
              { label: "Admin Login", path: "/adminlogin" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link onClick={() => setOpenMenu(false)} to={item.path}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
