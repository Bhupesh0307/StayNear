import React, { useEffect, useState } from "react";
import { websiteName } from "../Home/Home"; // Assuming you have this import

export default function WorkInProgress() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 75) {
          return prevProgress + 1;
        }
        return prevProgress;
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [progress]);

  // Animate loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 30 + 20}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationName: "float",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDirection: "alternate",
            }}
          ></div>
        ))}
      </div>

      {/* Content container */}
      <div className="relative max-w-3xl w-full p-8 md:p-12 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 text-center">
        {/* Logo/Brand */}
        

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-500">
          Under Construction
        </h1>
        
        <p className="text-xl text-white/80 mb-8">
          We're working hard to bring you something amazing. Our site is currently 
          <span className="font-semibold text-white"> under development</span>.
        </p>

        {/* Progress indicator */}
        <div className="mb-10">
          <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500" 
              style={{ width: `${progress}%`, transition: "width 0.5s ease" }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-white/60">
            <span>Development in progress{dots}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Contact/Social section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Stay Connected</h3>
          <div className="flex justify-center space-x-4">
            {/* Social media icons */}
            <a href="https://x.com/bhupesh_jh60422" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            
            <a href="https://www.linkedin.com/in/bhupesh-jha-09aa5323a/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
            <a href="https://github.com/Bhupesh0307/StayNear/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </div>
        </div>

        

        {/* Footer text */}
        <div className="mt-12 text-white/50 text-sm">
          <p>© {new Date().getFullYear()} {websiteName || "Your Company"}. All rights reserved.</p>
          <p className="mt-2">Expected launch: Soon™</p>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) translateX(20px) rotate(10deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-80px) translateX(-20px) rotate(-5deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}