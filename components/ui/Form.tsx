"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { useFormContext, Controller } from "react-hook-form";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg bg-white border border-gray-300 text-warm-text placeholder:text-warm-muted/70 text-xs sm:text-sm transition-colors",
        "focus:outline-none focus:border-gold focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-900 focus:ring-gold/40",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-warm-text placeholder:text-warm-muted/70 text-xs sm:text-sm transition-colors resize-y",
        "focus:outline-none focus:border-gold focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-900 focus:ring-gold/40",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full h-10 sm:h-12 px-3 sm:px-4 pr-8 sm:pr-10 rounded-lg bg-white border border-gray-300 text-warm-text text-xs sm:text-sm transition-colors appearance-none",
          "focus:outline-none focus:border-gold focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-900 focus:ring-gold/40",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  )
);
Select.displayName = "Select";

export const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-[#E6A78E] font-medium">{message}</p>;
};

export function FormField({
  name,
  label,
  hint,
  type = "text",
  required,
  options,
  textarea,
  rules,
  defaultValue,
  className,
}: {
  name: string;
  label: string;
  hint?: React.ReactNode;
  type?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  textarea?: boolean;
  rules?: any;
  defaultValue?: any;
  className?: string;
}) {
  const { control, formState: { errors } } = useFormContext<any>();
  const fieldError = (errors as any)?.[name]?.message as string | undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={name} className="block text-xs sm:text-sm font-medium text-warm-text">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue ?? ""}
        render={({ field }) => {
          if (options) {
            return (
              <Select id={name} required={required} {...field} aria-invalid={!!fieldError}>
                <option value="">— Select —</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            );
          }
          if (textarea) {
            return <Textarea id={name} required={required} {...field} aria-invalid={!!fieldError} />;
          }
          return (
            <Input
              id={name}
              type={type}
              required={required}
              autoComplete="off"
              {...field}
              aria-invalid={!!fieldError}
            />
          );
        }}
      />
      {hint && <p className="text-[10px] sm:text-xs text-warm-muted leading-relaxed">{hint}</p>}
      <FieldError message={fieldError} />
    </div>
  );
}

export function Checkbox({
  name,
  label,
  required,
  rules,
}: {
  name: string;
  label: React.ReactNode;
  required?: boolean;
  rules?: any;
}) {
  const { control, formState: { errors } } = useFormContext<any>();
  const fieldError = (errors as any)?.[name]?.message as string | undefined;
  return (
    <div className="space-y-1.5">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={false}
        render={({ field }) => (
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              required={required}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 rounded border border-gray-300 bg-white text-gold accent-gold focus:ring-2 focus:ring-gold/50"
              aria-invalid={!!fieldError}
            />
            <span className="text-xs sm:text-sm text-warm-text leading-relaxed group-hover:text-warm-text/95">
              {label}
              {required && <span className="ml-1 text-gold">*</span>}
            </span>
          </label>
        )}
      />
      <FieldError message={fieldError} />
    </div>
  );
}

export function RadioGroup({ className, children, defaultValue, ...props }: React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string }) {
  return (
    <div className={className} role="radiogroup" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { defaultValue });
        }
        return child;
      })}
    </div>
  );
}

export function RadioGroupItem({ value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { defaultValue?: string }) {
  return <input type="radio" value={value} {...props} />;
}
