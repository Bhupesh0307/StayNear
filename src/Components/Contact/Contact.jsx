import React from "react";
import { websiteName } from "../Home/Home";

export default function Contact() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log("Form Submitted!");
    //     alert("Thank you for contacting us!");
    // };
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="p-6 bg-gray-100 rounded-lg max-w-xl w-full">
    <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight text-center">
      Get in touch:
    </h1>
    <p className="text-lg sm:text-xl font-medium text-gray-600 mt-2 text-center">
      Fill in the form to start a conversation
    </p>

    {/* Address */}
    <div className="flex items-center mt-8 text-gray-600">
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <div className="ml-4 text-md tracking-wide font-semibold">
        Rupa Ki Nangal Post Sumel Via Jamdoli LNMIIT Jaipur
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-center mt-4 text-gray-600">
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
      <div className="ml-4 text-md tracking-wide font-semibold">
        +91 63774 91725
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center mt-2 text-gray-600">
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <div className="ml-4 text-md tracking-wide font-semibold">
        {`websiteName123@gmail.com`}
      </div>
    </div>
  </div>
</div>
    );
}
