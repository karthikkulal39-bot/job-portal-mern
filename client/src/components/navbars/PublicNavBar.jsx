import React from "react";
import { NavLink } from "react-router-dom";
import { BriefcaseBusiness,LogIn } from "lucide-react";
import { motion } from "framer-motion";
const PublicNavBar = () => {
  const MotionLogo = motion(BriefcaseBusiness);
  const MotionLogin=motion(LogIn);
  return (
    <nav className="top-0 bg-black/90 backdrop-blur-md sticky z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 p-4 m-4  ">
          <MotionLogo
            className=" outline-none w-10 h-10 text-purple-600  rounded"
            whileHover={{ scale: 1.2 }}
            whileTap={{ x: 380, rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          />

          <motion.h1
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
                text-5xl
                font-extrabold
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-pink-500
                bg-[length:200%_200%]
                bg-clip-text
                text-transparent
               "
          >
            JOBPORTAL
          </motion.h1>
        </div>

        <div className="flex  gap-4 items-center  group">
          <button 
            className=" flex items-center ml-4  gap-2 group-hover:scale-105  transition-all duration-300 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-4 py-2 rounded-lg">

            <MotionLogin className="text-white"/>
            <span className="text-white text-sm font-mono group-hover:scale-90 transition-all duration-500">Login</span>
          </button>
          <button 
            className=" flex items-center ml-4  gap-2 group-hover:scale-105  transition-all duration-300 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-4 py-2 rounded-lg">

        
            <span className="text-white text-sm font-mono group-hover:scale-90 transition-all duration-500">signIn</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavBar;
