import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  variant?: "default" | "muted" | "primary" | "hero";
};

const variants: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-white dark:bg-background",
  muted: "bg-muted/30",
  primary: "bg-blue-900 text-white",
  hero: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white",
};

export function Section({
  className,
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
