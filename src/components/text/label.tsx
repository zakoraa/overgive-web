import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  text,
  size = "md",
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-xs font-medium",
    md: "text-sm font-semibold",
    lg: "text-base font-bold",
  };

  return (
    <h3 className={cn("text-center", sizeStyles[size], className)} {...props}>
      {text}
    </h3>
  );
};
