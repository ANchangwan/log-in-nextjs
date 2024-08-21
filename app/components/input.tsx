import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function FormInput({
  name,
  errors,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        name={name}
        className={`w-full px-4 py-2 border rounded-full border-black 
        focus:border-none  focus:outline-none focus:ring-2 ${
          errors ? "ring-red-500 ring-2 border-none" : "focus:ring-orange-500"
        }`}
        {...rest}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500  text-lg">
          {error}
        </span>
      ))}
    </div>
  );
}
