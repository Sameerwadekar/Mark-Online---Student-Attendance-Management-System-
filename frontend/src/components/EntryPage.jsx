import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

function EntryPage() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

  return (
    <>
      <div className="h-screen flex items-center justify-center transition-colors duration-200  bg-gradient-to-br from-purple-800 to-black text-white">
        <div
          className={`text-center p-8 rounded-lg shadow-lg transition-colors duration-500bg-opacity-90 bg-black`}
        >
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">Mark Online</span>
          </h1>
          <p className="text-xl mb-6">
            Your Smart Attendance Management System
          </p>
          <p className="text-lg italic mb-8">
            Khar Education Society's College of Commerce and Economics
          </p>

          <button
            onClick={() => {
              setProgress(30);

              setTimeout(() => setProgress(60), 300);
              setTimeout(() => setProgress(100), 600);

              setTimeout(() => navigate("/signup"), 700);
            }}
            className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 transition-all duration-300 bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-400`}
          >
            Get Started
          </button>

          <div className="mt-8">
            <p className="text-sm">
              Manage attendance efficiently and effortlessly.
            </p>
          </div>
        </div>
      </div>
      <LoadingBar
        color="#ff416c"
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </>
  );
}

export default EntryPage;
