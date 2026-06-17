"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export default function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#c4992e",
  colorTo = "#E8C870",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": borderWidth,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-[0] rounded-[inherit]"
        style={{
          padding: `${borderWidth}px`,
          background: `linear-gradient(var(--color-from), var(--color-to))`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
