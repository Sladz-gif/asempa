"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black-900 focus-visible:ring-gold disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-black-900 shadow-gold hover:brightness-105 hover:-translate-y-0.5 hover:shadow-gold-lg active:translate-y-0",
  outline:
    "border-[1.5px] border-gold text-warm-text bg-transparent hover:bg-gold hover:text-black-900",
  ghost:
    "bg-transparent text-warm-text hover:text-gold hover:bg-gray-100/50",
};

const sizes: Record<Size, string> = {
  sm: "h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm rounded-md",
  md: "h-10 sm:h-11 px-4 sm:px-6 text-sm rounded-lg",
  lg: "h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  leftIcon,
  rightIcon,
  children,
  href,
  ...props
}: Omit<ButtonProps, "ref" | "asChild"> & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(baseClasses, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
}
