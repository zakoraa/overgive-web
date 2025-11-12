import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Title: React.FC<TitleProps> = ({
  text,
  size = "md",
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-lg font-bold",
    md: "text-xl font-bold",
    lg: "text-3xl font-extrabold",
  };

  return (
    <h1 className={cn(sizeStyles[size], className)} {...props}>
      {text}
    </h1>
  );
};
