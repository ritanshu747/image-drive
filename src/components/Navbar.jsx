import React, { useState } from "react";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import Logo from "../logo/logo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <header>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between w-400px">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-white text-xl font-bold">ImageDrive</span>
            </Link>
          </div>

          {/* Navigation Links and Logout Button */}
          <div className="flex items-center">
            <ul className="hidden md:flex space-x-4 text-white">
              {/* Add more navigation links here if needed */}
            </ul>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
            >
              Logout
            </button>

            {/* Menu icon for mobile */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setOpen(!open)}
                className="text-white focus:outline-none"
              >
                {open ? <IoClose size="26px" /> : <IoMenuOutline size="26px" />}
              </button>
            </div>
          </div>
        </div>

        {/* Responsive menu for mobile */}
        <div className={`md:hidden mt-4 ${open ? "block" : "hidden"}`}>
          <ul className="text-white">
            {/* Add mobile navigation links here */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
