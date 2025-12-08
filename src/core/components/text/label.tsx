"use client";

import { cn } from "@/core/utils/util";
import { HTMLAttributes, ReactNode } from "react";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  text?: string;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

export const Label = ({
  text,
  children,
  size = "md",
  required,
  className,
  htmlFor,
  ...props
}: LabelProps) => {
  const sizeClasses = {
    sm: "text-sm font-medium",
    md: "text-md font-bold",
    lg: "text-lg font-semibold",
  };

  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={cn("line-clamp-2 text-start", sizeClasses[size], className)}
    >
      {text || children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
