import { cn } from "@/lib/utils";

/** Fine ligne dorée placée sous les titres de section pour l'effet luxe. */
export default function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-14 bg-gradient-to-r from-[#DCA54A] to-[#e8c86a]",
        className
      )}
    />
  );
}
