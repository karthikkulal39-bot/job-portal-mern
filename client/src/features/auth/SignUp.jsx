import PageNotFound from "@/components/errors/PageNotFound";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "@/utils/toasts";
import { Input } from "../../components/ui/input";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Field,
  FieldError,
  FieldDescription,
  FieldLabel,
} from "../../components/ui/field";
import InputField from "@/components/InputField";
import LoadingScreen from "@/components/errors/LoadingScreen";
import { Icon, Variable } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const registerMutate = useMutation({
    mutationKey:["signup"],
    mutationFn: (userData) => {
      return axios.post("http://localhost:5000/usersignup", userData);
    },
    onError: (error, variables) => {
      switch (error?.response?.status || error?.response?.data?.error?.code) {
        case 404:
          navigate("/pageNotFound");
          break;

        case "ERR_NETWORK":
          errorToast("server is down", { duration: 5000 });
          break;

        case 500:
          errorToast("internal server error try some time later ...", {
            duration: 1000,
          });
        case 403:
          errorToast("redirecting to otp verification... please wait", {
            duration:2000,
          });

          sessionStorage.setItem(
            "signupdata",
            JSON.stringify({
              email: variables.email,
              name: variables.name,
            }),
          );

          setTimeout(() => {
            navigate("/signup/otp-verify");
          }, 1000);
          break;

        case 409:
          successToast(
            "You already have an account. Redirecting to the login page...",
            { duration: 2000 },
          );
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          break;
      }
    },
    onSuccess: (response, variables) => {
      console.log(response);
      sessionStorage.setItem(
        "signupdata",
        JSON.stringify({
          email: variables.email,
          name: variables.name,
        }),
      );
      successToast("redirecting to otp verification... please wait", {
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/signup/otp-verify");
      }, 1000);
    },
  });

  const onsubmit = (data) => {
    registerMutate.mutate(data);
  };

  if (registerMutate.isPending) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black w-full h-full; flex flex-col justify-center items-center [&>*]:text-white ">
      <div
        className=" w-[32%]
      "
      >
        {" "}
        <ul className=" text-sm list-disc  w-full max-w-lg rounded-md p-1 bg-transparent text-red-500  mb-2 mt-4 flex flex-col gap-1">
          {registerMutate.error?.response?.data?.errors?.map((err, key) => (
            <li className="" key={key}>
              {err.msg}
            </li>
          ))}{" "}
        </ul>
      </div>

      <Card className="w-[80%] max-w-lg flex flex-col  rounded-lg h-full   p-6  shadow-2xl shadow-red-600 border-0 mb-10">
        <form onSubmit={handleSubmit(onsubmit)} className="">
          <CardHeader className="mb-4">
            <CardTitle>Create your new Account</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-3">
            {/* firstName input */}
            <InputField
              id="firstName"
              type="text"
              name="firstname"
              minLength={2}
              maxLength={15}
              placeholder="Enter your firstName"
              Label="First Name"
              errors={errors}
              watch={watch}
              register={register}
            />
            {/* lastName input */}
            <InputField
              id="lastName"
              type="text"
              name="lastname"
              minLength={2}
              maxLength={15}
              placeholder="Enter your lastName"
              Label="Last Name"
              errors={errors}
              watch={watch}
              register={register}
            />
            {/* email input */}
            <InputField
              id="email"
              type="email"
              name="email"
              minLength={2}
              maxLength={50}
              placeholder="Enter your email"
              Label="Email"
              errors={errors}
              watch={watch}
              register={register}
            />
            {/* password input */}
            <InputField
              Label="Password"
              id="password"
              type="password"
              name="password"
              minLength={2}
              maxLength={15}
              autoComplete="new-password"
              placeholder="Enter your password"
              register={register}
              watch={watch}
              errors={errors}
              isPassword={true}
            />

            {/* confirm password input */}
            <InputField
              id="confPassword"
              type="password"
              name="confirmPassword"
              minLength={2}
              maxLength={15}
              autoComplete="new-password"
              placeholder="Enter your password"
              errors={errors}
              watch={watch}
              register={register}
              Label="Confirm Password"
              Password={watch("password")}
              isPassword={true}
            />

            <Field className="flex flex-col rounded-md p-2 items-center gap-2">
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500"
                  id="terms"
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                />
                <FieldLabel htmlFor="terms" className="ml-2">
                  I accept the terms and conditions
                </FieldLabel>
              </div>
              <FieldError className="text-red-500 mb-[-10px] pl-2">
                {errors.terms && <p>{errors.terms.message}</p>}
              </FieldError>
            </Field>

            <Field className="flex flex-col items-center gap-2">
              <FieldLabel className="text-xs font-semibold">
                if you have an account?<NavLink to="/login">Login here</NavLink>
              </FieldLabel>
            </Field>

            <Input
              className="bg-gray-500  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
              value={"Submit"}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
