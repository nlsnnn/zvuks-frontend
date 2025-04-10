import { forwardRef } from "react";

export const Input = forwardRef(
  ({ placeholder, className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={
          "w-full max-w-md px-4 py-2 rounded-full border border-gray-200 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 " +
          className
        }
        placeholder={placeholder}
        {...props}
      />
    );
  }
);
