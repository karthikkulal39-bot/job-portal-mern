import NetworkErrPage from "@/components/errors/NetworkErrPage";
import PageNotFound from "@/components/errors/PageNotFound";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import  { useForm } from "react-hook-form";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({mode:"onChange"});
  const [passVis,setPassVis]=useState(true);
  const [confPassVis,setConfPassVis]=useState(true);

  const registerMutate=useMutation({
    mutationFn:(userData)=>{
      return axios.post('http://localhost:5000/usersignup2',userData);
    },
    onError: (error) => {
  console.log("iam ",error.message);
  console.log("me",error?.response?.data);
}
  })
  const pass = watch("password");

  const onsubmit = (data) => {
     registerMutate.mutate(data);   

  };

  if(registerMutate.isPending){
    return <div> loaading</div>
  }
  // {console.log(registerMutate.error?.response)}
  // {console.log(registerMutate?.data)}
  //  {console.log(registerMutate?.isSuccess)}
  switch(registerMutate.error?.response?.status || registerMutate.error?.code ){
    case 404:
     return <PageNotFound message={registerMutate.error?.response}/>; 
    case 'ERR_NETWORK':
      return <NetworkErrPage/>;    
  }
  

  return (
    <div>
     <div> {registerMutate.error?.response?.data?.errors?.map((err,key)=>(
         <p key={key}>{err.msg}</p>
      ))} </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              name="firstname"
              minLength={2}
              maxLength={15}
              placeholder="Enter your firstname"
              {...register("firstname", { required: "first is required" })}
            />
            {errors.firstname && <p>{errors.firstname.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              name="lastname"
              minLength={2}
              maxLength={15}
              placeholder="Enter your lastName"
              {...register("lastName", { required: "lastName is required" })}
            />
            {errors.lastname && <p>{errors.lastname.message}</p>}
          </div>
          <div>
            
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              type="email"
              name="email"
              minLength={2}
              maxLength={50}
              placeholder="Enter your email"
              {...register("email", { required: "email required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">password:</label>
           <div>
            <input
              id="password"
              type={passVis?"password":"text"}
              name="password"
              minLength={2}
              maxLength={15}
              autoComplete="new-password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <button 
              type="button"
            onClick={()=>{
              setPassVis(prev=>!prev);
            }}>eye</button>
            </div>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confPassword">confirm password:</label>
           <div>
            <input
              id="confPassword"
              type={confPassVis?"password":"text"}
              name="confirmPassword"
              minLength={2}
              maxLength={15}
              autoComplete="new-password"
              placeholder="Enter your password"
              {...register("confirmPassword", {
                required: " is required",
                validate:(value)=>{
                  return pass==value || "Password do not matching"
                }
              })}
            />
            <button 
            type="button"
            onClick={()=>{
              setConfPassVis(prev=>!prev);
            }}>eye</button>
            </div>

            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <input type="submit" value={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
