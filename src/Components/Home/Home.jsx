import React from "react";
import { Link } from "react-router-dom";
export const websiteName = "StayNear"
import StayNearLogo from "../../assets/Yellow and Black Modern Media Logo.png";
export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 flex justify-center">
                <div className="max-w-xl space-y-8 text-center">
                    <h2 className="text-5xl font-bold sm:text-5xl">{websiteName}</h2>
                </div>
            </div>
            <div className="relative w-full flex justify-center sm:my-20 ">
                <img 
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-xl" 
                    src="https://images.pexels.com/photos/5158948/pexels-photo-5158948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  
                    alt="Artistic Portrait"
                />
            </div>
        </div>
    );
}
