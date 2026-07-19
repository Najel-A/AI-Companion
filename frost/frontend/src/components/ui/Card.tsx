import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-frost-200/80 bg-white/75 p-6 shadow-soft backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}
