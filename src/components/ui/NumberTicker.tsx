"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface NumberTickerProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export default function NumberTicker({
  value,
  duration = 2000,
  className,
  suffix = "",
  prefix = "",
}: NumberTickerProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString("fr-FR")}{suffix}
    </span>
  );
}
