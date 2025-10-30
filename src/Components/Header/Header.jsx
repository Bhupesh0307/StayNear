import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import StayNearLogo from "../../assets/Yellow and Black Modern Media Logo.png";
import { AuthContext } from "../../context/AuthContext"; // ✅ Import your AuthContext

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // ✅ Get user info and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="shadow sticky z-50 top-0 bg-white dark: w-full transition-colors duration-300">
      <nav className="border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3 w-full">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={StayNearLogo}
              className="mr-3 h-10 w-auto rounded-lg"
              alt="StayNear Logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-black focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-16 left-0 w-full bg-white lg:bg-transparent lg:static lg:block lg:w-auto transition-all`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 text-center lg:text-left items-center">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/guest-house", label: "Housing" },
                { to: "/upload-guest-house", label: "Upload" },
                { to: "/contact", label: "Contact Us" },
              ].map((item) => (
                <li key={item.to} className="w-full lg:w-auto">
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 duration-200 ${
                        isActive
                          ? "text-orange-700 font-semibold"
                          : "text-black"
                      } border-b lg:border-0 hover:bg-gray-100 lg:hover:bg-transparent`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* ✅ Auth Buttons */}
              <li className="mt-2 lg:mt-0">
                {!user ? (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md hover:bg-orange-50 transition"
                    >
                      Signup
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="text-black font-medium">
                      Hi, {user.name || user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
