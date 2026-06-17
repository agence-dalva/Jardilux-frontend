"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-1.5",
        "bg-gradient-to-r from-[#f0ead8] via-[#faf7f2] to-[#f0ead8]",
        "border border-[#e0d8c8]",
        "text-sm font-medium text-[#DCA54A]",
        "shadow-sm",
        className
      )}
    >
      <span className="mr-2 inline-flex items-center">
        <span className="h-2 w-2 rounded-full bg-[#E8C870] animate-pulse" />
      </span>
      {children}
    </span>
  );
}
