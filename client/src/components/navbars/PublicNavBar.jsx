import React, { useEffect,useState } from "react";
import { BriefcaseBusiness, LogIn, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Sheet,SheetContent, SheetTrigger } from "../ui/sheet";
import { DropdownMenuContent, DropdownMenuTrigger,DropdownMenu } from "../ui/dropdown-menu";
import { useLocation } from "react-router-dom";

const PublicNavBar = () => {

  const location = useLocation();
  const [signUpDisabled,setSignUpDisabled]=useState(false);
  const [loginDisabled,setLoginDisabled]=useState(false);

  const MotionLogo = motion.create(BriefcaseBusiness);
  const MotionLogin = motion.create(LogIn);
  const [open,setOpen]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
  if(location.pathname==="/signup"){
      setSignUpDisabled(true);
    }else setSignUpDisabled(false);

  },[location.pathname]);
  
 
  useEffect(()=>{
    const media=window.matchMedia("(min-width:768px)");
    const handleMediaChange=(e)=>{
      if(e.matches){
        setOpen(false);
      }
    }
    media.addEventListener("change",handleMediaChange);
    return ()=>{
      media.removeEventListener("change",handleMediaChange);
    }
  },[]);


  return (
    <nav className="top-0 md:flex w-full h-[15vh] bg-black/90 backdrop-blur-md sticky z-50">
      <div className="flex w-full items-center justify-evenly"> 
        <div className="flex items-center gap-6 p-4 m-4  ">
          <MotionLogo
            className=" outline-none w-7 h-7 md:w-10 md:h-10 text-purple-600  rounded"
            whileHover={{ scale: 1.2 }}
            whileTap={{ x: 380, rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          />

          <motion.h1 onClick={()=>navigate('/')}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
                text-xl
                md:text-5xl
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
            <div className="ml-7 mr-7"></div>
        <div className="hidden md:flex gap-4 items-center  ">
          <Button onClick={()=>{navigate("/login")}} className=" flex items-center ml-4 group gap-2 group-hover:scale-105  transition-all duration-300 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-4 py-2 rounded-lg">
            <MotionLogin className="text-white" />
            <span className="text-white text-sm font-mono group-hover:scale-90 transition-all duration-500">
              Login
            </span>
          </Button>

          <Button onClick={()=>{
            navigate("/signup");
            setSignUpDisabled(true);
          }} className={` flex items-center ml-4  gap-2 group group-hover:scale-105  transition-all duration-300 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-4 py-2 rounded-lg ${signUpDisabled ? "opacity-50 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-violet-500"}`}
           disabled={signUpDisabled}>
            {" "}
            <span className="text-white text-sm font-mono group-hover:scale-90 transition-all duration-500">
              Sign Up
            </span>
          </Button>
        </div>

        {/* mobile menu */}
        <div className="md:hidden">
           <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="text-white" />
              </Button>
            </DropdownMenuTrigger>
           
            <DropdownMenuContent side="bottom" align="end" className="bg-black/90 backdrop-blur-md flex flex-row">
              <div className="gap-4 flex flex-col justify-start m-2">
                <Button onClick={()=>{navigate("/login")}} className=" flex items-center ml-4 group gap-2 group-hover:scale-105  transition-all duration-300 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-4 py-2 rounded-lg">
                  <MotionLogin className="text-white" />
                  <span className="text-white text-sm font-mono group-hover:scale-90 transition-all duration-500">
                    Login
                  </span>
                </Button>

                <Button onClick={()=>{navigate("/signup")}} className=" flex items-center ml-4  gap-2 group group-hover:scale-105  transition-all duration-300 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-4 py-2 rounded-lg">
                  {" "}
                  <span className="text-white text-sm font-mono group-hover:scale-90 transition-all duration-500">
                    Sign Up
                  </span>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavBar;
