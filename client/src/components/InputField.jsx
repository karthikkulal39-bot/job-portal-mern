import React, { useState } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Eye,EyeOff } from "lucide-react";

const InputField = ({
  id,
  type,
  name,
  minLength,
  maxLength,
  placeholder,
  Label,
  errors,
  watch,
  register,
  Password,
  isPassword,
  ...props
}) => {
  const registerOptions = {
    required: `${Label} is required`,
    ...(Password && {
      validate: (value) => {
        return value === Password || "Password not matching";
      },
    }),
  };
  const [passVis, setPassVis] = useState(true);
  return (
    <Field className="flex flex-col gap-1 mb-0">
      <FieldLabel htmlFor={id}>{Label}</FieldLabel>
      <div className=" flex flex-row  gap-2">
        <Input
          id={id}
          name={name}
          type={passVis ? type : "text"}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          {...register(name, registerOptions)}
          {...props}
        />
        {isPassword && (
          <button
            className=""
            type="button"
            onClick={() => {
              setPassVis((prev) => !prev);
            }}
          >
            {passVis ? <Eye></Eye> : <EyeOff></EyeOff>}
          </button>
        )}
      </div>
      <FieldError className="text-red-500 mb-[-10px] pl-2">
        {errors[name] && <p>{errors[name].message}</p>}
      </FieldError>
    </Field>
  );
};

export default InputField;
