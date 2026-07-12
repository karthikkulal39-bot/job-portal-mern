import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { errorToast } from "@/utils/toasts";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const navigate = useNavigate();

  const [leftTime,setLeftTime]=useState(10);
  useEffect(()=>{
    const time=setInterval(()=>{
      setLeftTime((prev)=>{
         if(prev<=1){
            clearInterval(time);
            return 0
        }
        return prev-1;
      });
    },1000)
    return ()=>clearInterval(time);
  },[leftTime])
  const data = JSON.parse(sessionStorage.getItem("signupdata"));
  useEffect(() => {
    if (!data?.email) {
      navigate("/signup", {
        replace: true,
        state: {
          message: "please fill details in signup page",
        },
      });
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const sendOtpMutation = useMutation({
    mutationFn: (data) => {
      return axios.post("/auth/send-otp", data);
    },

  });
  const sendMeOtp = (data) => {
    console.log(data);
    sendOtpMutation.mutate(data);
  };
  useEffect(() => {
    sendMeOtp(data);
  }, []);

  const verifyOtpMutation = useMutation({
    mutationKey: ["otp-verify"],
    mutationFn: (otp) => {
      return axios.post("/auth/verify-otp", otp);
    },
  });
  const onsubmit = (data) => {
    console.log("heuu");
    verifyOtpMutation.mutate(data);
  };
  function handleResend(){
    sendMeOtp(data);
    setLeftTime(10);

  }
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center  ">
      <Card className="text-white w-auto pl-12 pr-12 h-[40%] flex flex-row justify-center items-center ">
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-3">
          <Field>
            <FieldLabel className="text-white">Enter your OTP</FieldLabel>
          </Field>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "otp is required",
              minLength: {
                value: 6,
                message: "otp must be 6 digits",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
          <div className="flex justify-between  p-2">
            
            <Button type="submit" className="hover:bg-blue-700 hover:scale-105 transition-all duration-200 w-28 h-10 focus:ring-offset-2"> submit </Button>
            
            <Button type="button" onClick={handleResend} className="hover:bg-blue-700 hover:scale-105 transition-all duration-200 w-28 h-10 focus:ring-offset-2"
            disabled={leftTime!==0}
            >
             {leftTime!==0?leftTime:"resend otp"}
            </Button>

          </div>
        </form>
      </Card>
    </div>
  );
};

export default OtpPage;
