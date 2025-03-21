import React from "react"

import { websiteName } from "../Home/Home";
export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://i.pinimg.com/736x/06/fd/9d/06fd9dde192fe02644663c4bda0cf6ca.jpg"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            {websiteName} is carried out for college students
                        </h2>
                        <p className="mt-6 text-gray-600">
                        Students moving to new cities for education often face challenges in finding suitable accommodation near their institutions. Existing options are fragmented, involve multiple intermediaries, and lack a streamlined booking process.
                        </p>
                        <p className="mt-4 text-gray-600">
                        This aim for a centralized, user-friendly platform to address this gap effectively.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}    
