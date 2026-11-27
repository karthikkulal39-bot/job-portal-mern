import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { errorToast, successToast } from "@/utils/toasts";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const navigate = useNavigate();
  const initialSendStarted = useRef(false);

  const [leftTime, setLeftTime] = useState(180);

  useEffect(() => {
    if (leftTime <= 0) return;

    const timer = setTimeout(() => {
     setLeftTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [leftTime]);
  const signupData = JSON.parse(sessionStorage.getItem("signupdata"));
  const otpRequestData = {
    firstName: signupData?.firstName || signupData?.firstname || signupData?.name,
    email: signupData?.email,
  };
  useEffect(() => {
    if (!otpRequestData.email || !otpRequestData.firstName) {
      navigate("/signup", {
        replace: true,
        state: {
          message: "please fill details in signup page",
        },
      });
    }
  },[otpRequestData]);

  const {
    control,
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const sendOtpMutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:5000/auth/send-otp", data, {
        timeout: 15000,
      });
    },
    onError: (error) => {
      setLeftTime(0);
      toast.error(
        error.code === "ECONNABORTED"
          ? "OTP request timed out. Please try again."
          : "Unable to send OTP. Please try again.",
        { duration: 3000 },
      );
    },
    onSuccess:()=>{
      console.log("success",response);
      toast.success("OTP send to your email..",5000);

    }
  });
  const sendMeOtp = (data) => {
    console.log(data);
    sendOtpMutation.mutate(data);
  };
  useEffect(() => {
    if (initialSendStarted.current) return;
    if (otpRequestData.email && otpRequestData.firstName) {
      initialSendStarted.current = true;
      sendMeOtp(otpRequestData);
    }
  }, [otpRequestData.email, otpRequestData.firstName]);

  const verifyOtpMutation = useMutation({
    mutationKey: ["otp-verify"],
    mutationFn: (otp) => {
      console.log(otp);
      return axios.post("/auth/verify-otp", otp);
    },
    onError:(error)=>{
      switch(error?.response?.status||error?.response?.data?.error?.code){
        case 404:
          navigate('/signup',{
            replace:true,
            message:"signin is required for otp verification"
          })
          break;
        case 403:
          successToast("Your account is already verified. login with credentials",2000);
          break;
        case 400:
          errorToast("Check your email for otp try again after when timer ends",2000);
          break;
          case 500:
            errorToast("something went wrong",2000);
            break;
          default:
            errorToast("something went wrong",2000);
      }
    },
    onSuccess:(response)=>{
      successToast("OTP verification completed please login ",2000);
      navigate('/login');
    }
  });
  const onsubmit = (otpData) => {
    verifyOtpMutation.mutate({
      ...otpRequestData,
      ...otpData,
    });
  };
  function handleResend(){
    sendMeOtp(otpRequestData);
    setLeftTime(180);

  }

  const formattedTime = `${Math.floor(leftTime / 60)
    .toString()
    .padStart(2, "0")}:${(leftTime % 60).toString().padStart(2, "0")}`;

  return (
    <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-black px-4 py-10">
      <Card className="w-full max-w-md border border-white/10 bg-neutral-950 p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8">
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Email verification
            </p>
            <h1 className="text-2xl font-semibold">Enter your OTP</h1>
            <p className="mt-2 text-sm text-neutral-400">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-neutral-200">
                {otpRequestData.email || "your email"}
              </span>
            </p>
          </div>

          <Controller
            name="otp"
            control={control}
            rules={{
              required: "otp is required",
              validate: (value) =>
                value?.length === 6 || "OTP must be 6 digits",
            }}
            render={({ field, fieldState }) => (
              <Field className="items-center gap-3">
                <FieldLabel className="sr-only">One-time password</FieldLabel>
                <InputOTP
                  maxLength={6}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  aria-invalid={fieldState.error ? "true" : "false"}
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
                {fieldState.error && (
                  <p className="text-sm text-red-400" role="alert">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              className="h-11 w-full border-white/15 bg-transparent text-white hover:bg-white/10"
              disabled={leftTime !== 0}
            >
              {leftTime !== 0 ? `Resend in ${formattedTime}` : "Resend OTP"}
            </Button>
          </div>
          <p
            className="text-center text-xs text-neutral-400"
            role="status"
            aria-live="polite"
          >
            {sendOtpMutation.isPending
              ? "Sending OTP..."
              : leftTime !== 0
                ? "A new code can be requested when the timer ends."
                : "Didn't receive a code? You can resend it now."}
          </p>
        </form>
      </Card>
    </main>
  );
};

export default OtpPage;
