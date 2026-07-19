import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-frost-200/90 bg-white/90 px-4 py-3 text-[15px] text-frost-900 outline-none transition placeholder:text-frost-400 focus:border-frost-400 focus:ring-2 focus:ring-frost-300/60 ${className}`}
      {...props}
    />
  );
}
