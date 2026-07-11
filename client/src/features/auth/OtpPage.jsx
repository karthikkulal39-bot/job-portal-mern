import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { Controller,useForm } from "react-hook-form";

const OtpPage = () => {
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
    sendOtpMutation.mutate(data);
  };
  // useEffect(() => {
  //   sendMeOtp(data);
  // }, []);
  const data = JSON.parse(sessionStorage.getItem("signupdata"));

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
  return (
    <div>
      <Card>
    <form  onSubmit={handleSubmit(onsubmit)}>
    <Controller
      name="otp"
      control={control}
      rules={{
        required:"otp is required",
        minLength:{
          value:6,
          message:"otp must be 6 digits",
        }
      }
      }
      render={({field,fieldState})=>(

      <>
 
          <InputOTP maxLength={6} 
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
          {fieldState.error && (<p>{fieldState.error.message}</p>)}
          </>
        )}
          />
          
        <Button type="button" >Resend otp</Button>

          <input type={"submit"} value={"Submit"}/>
        </form>
      </Card>
    </div>
   
   
  );
};

export default OtpPage;
