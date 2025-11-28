"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-indigo focus:ring-offset-2",
          {
            "bg-electric-indigo text-white hover:bg-electric-indigo/90 shadow-lg shadow-electric-indigo/25":
              variant === "primary",
            "bg-midnight text-white hover:bg-midnight/90":
              variant === "secondary",
            "border-2 border-electric-indigo text-electric-indigo hover:bg-electric-indigo hover:text-white":
              variant === "outline",
            "text-slate-700 hover:text-electric-indigo hover:bg-slate-50":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
