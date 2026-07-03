import React from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import {useNavigate} from 'react-router-dom'
const LandingPage = () => {
  const navigate=useNavigate();
  return (
    <div className="bg-black overflow-y-auto flex flex-col justify-between items-center min-h-screen w-full px-3 sm:px-0">
      <div className="w-[92%] sm:w-[80%] lg:w-[70%] display flex flex-col gap-12 sm:gap-16 md:gap-20 mt-10 sm:mt-12 justify-center items-center">
        {/* Number of Jobs small toast */}
        <div
            className="
              flex items-center justify-center gap-2 h-auto px-3 py-1
              border-1 border-green-500 rounded-lg w-full max-w-xs sm:max-w-sm lg:w-[30%] backdrop-blur-md bg-green-500/25 "
        >
          <TrendingUp className="text-green-500 size-5" />
          <span className="text-green-300 font-mono text-sm [text-shadow:0_0_2px_rgba(34,197,158,1)]">
            {" "}
            2.4m jobs updated daily
          </span>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl leading-tight font-se font-bold text-white">
            Find work that{" "}
          </h1>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl leading-tight font-se font-bold text-white">moves you</h1>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="text-white text-sm sm:text-md font-mono flex-wrap text-center max-w-2xl">
            <span>
              The smartest platform for ambitious professionals. Real salaries
            </span>
            <span>,real companies,real matches -- no noise, no fluff.</span>
          </div>

          <div>
            <Button onClick={()=>{navigate("/signup")}}
              className="text-white bg-green-500 hover:bg-green-600 px-6 py-3 w-full sm:w-auto"
              variant="default"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

     

      <div className="container w-full">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center flex-wrap gap-1 border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white-50">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white-50">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white-50">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white-50">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white-50">
                About
              </a>
            </li>
          </ul>
          <p className="text-center text-white-50">© 2026 Company, Inc</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
