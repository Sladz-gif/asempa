import React from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  hover?: boolean;
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = "md", interactive, hover, asChild, children, ...props }, ref) => {
    const paddingClasses = {
      none: "p-0",
      sm: "p-2.5 sm:p-3 md:p-4",
      md: "p-3 sm:p-4 md:p-6 lg:p-7",
      lg: "p-4 sm:p-5 md:p-8",
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(
          "card-surface rounded-xl border-black-700/60",
          paddingClasses[padding],
          interactive && "cursor-pointer",
          hover && "card-surface-hover",
          (children.props as any).className,
          className
        ),
        ...props,
      });
    }

    return (
      <div
        ref={ref}
        className={cn(
          "card-surface rounded-xl border-black-700/60",
          paddingClasses[padding],
          interactive && "cursor-pointer",
          hover && "card-surface-hover",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4 flex flex-col gap-1.5", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-serif text-lg sm:text-xl md:text-2xl font-semibold text-warm-text", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs sm:text-sm md:text-base text-warm-muted leading-relaxed", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-3", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-6 flex items-center justify-between pt-4 border-t border-black-700", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
