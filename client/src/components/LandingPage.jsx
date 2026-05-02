import React from "react";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="flex flex-col items-center justify-center w-full h-full py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Find Your Dream Job Faster 🚀
          </h1>

          {/* Subtext */}
          <p className="mt-4 sm:mt-6 font-medium leading-relaxed text-center text-sm sm:text-base md:text-lg text-gray-700">
            Discover thousands of opportunities, apply instantly, and track your
            applications — all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              
              className="w-full sm:w-auto text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>

            <Button
              size="lg"
              onClick={() => navigate("/jobs")}
              className="w-full sm:w-auto text-sm sm:text-base font-semibold bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
