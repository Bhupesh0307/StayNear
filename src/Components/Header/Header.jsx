// import React from 'react'
// import {Link, NavLink} from 'react-router-dom'
// import StayNearLogo from "../../assets/Yellow and Black Modern Media Logo.png";

// export default function Header() {
//     return (
//         <header className="shadow sticky z-50 top-0">
//             <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
//                 <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//                     <Link to="/" className="flex items-center">
//                     <img src={StayNearLogo} className="mr-3 w-65 rounded-lg" alt="StayNear Logo" />

//                     </Link>
//                     <div className="flex items-center lg:order-2">
//                         <Link
//                             to="#"
//                             className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                         >
//                             Log in
//                         </Link>
//                         <Link
//                             to="#"
//                             className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                         >
//                             Get started
//                         </Link>
//                     </div>
//                     <div
//                         className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
//                         id="mobile-menu-2"
//                     >
//                         <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//                             <li>
//                                 <NavLink
//                                 to="/"
//                                     className={({isActive}) =>
//                                         `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-grey-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                     }
//                                 >
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                 to="/about"
//                                     className={({isActive}) =>
//                                         `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-grey-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                     }
//                                 >
//                                     About
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                 to="/guest-house"
//                                     className={({isActive}) =>
//                                         `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-grey-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                     }
//                                 >
//                                     Guest House
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                 to="/upload-guest-house"
//                                     className={({isActive}) =>
//                                         `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-grey-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                     }
//                                 >
//                                     Upload
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                 to="/contact"
//                                     className={({isActive}) =>
//                                         `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-grey-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                     }
//                                 >
//                                     Contact Us
//                                 </NavLink>
//                             </li>
                            
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// }
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import StayNearLogo from "../../assets/Yellow and Black Modern Media Logo.png";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="shadow sticky z-50 top-0 bg-white dark: w-full transition-colors duration-300">
            <nav className="border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3 w-full">
                <div className="flex justify-between items-center w-full">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={StayNearLogo} className="mr-3 h-10 w-auto rounded-lg" alt="StayNear Logo" />
                    </Link>

                    <div className="flex items-center">
                        {/* Mobile Menu Button */}
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
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 text-center lg:text-left">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/about", label: "About" },
                                { to: "/guest-house", label: "Guest House" },
                                { to: "/upload-guest-house", label: "Upload" },
                                { to: "/contact", label: "Contact Us" }
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
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}