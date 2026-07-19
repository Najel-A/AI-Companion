import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-frost-800 text-white hover:bg-frost-900 shadow-soft",
    secondary:
      "bg-white/80 text-frost-800 border border-frost-200 hover:bg-frost-50",
    ghost: "bg-transparent text-frost-700 hover:bg-frost-100/80",
  };

  const sizes = {
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-semibold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
