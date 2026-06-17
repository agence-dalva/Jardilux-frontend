"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  shimmerColor?: string;
  className?: string;
  as?: "button" | "span";
}

export default function ShimmerButton({
  children,
  variant = "primary",
  size = "md",
  className,
  as: Tag = "button",
  ...props
}: ShimmerButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#9E7020] text-white hover:bg-[#DCA54A] focus:ring-[#9E7020] shadow-md hover:shadow-lg",
    secondary:
      "bg-[#c4992e] text-white hover:bg-[#b08828] focus:ring-[#c4992e] shadow-md hover:shadow-lg",
    outline:
      "border-2 border-[#9E7020] text-[#9E7020] hover:bg-[#9E7020] hover:text-white focus:ring-[#9E7020]",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <Tag
      className={cn(base, variants[variant], sizes[size], "btn-shimmer", className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Tag>
  );
}
