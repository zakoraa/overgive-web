import React from "react";
import clsx from "clsx";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  height?: string;
  width?: string;
  fontSize?: string;
  borderRadius?: string;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function AppButton({
  height = "48px",
  width = "90%",
  fontSize = "16px",
  borderRadius = "30px",
  text,
  onClick,
  className,
  bgColor,
  isLoading = false,
  disabled = false,
  ...props
}: AppButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        bgColor ?? "bg-primary",
        "text-white",
        isLoading || disabled
          ? "opacity-70 hover:opacity-70"
          : "cursor-pointer hover:opacity-80",
        "flex items-center justify-center font-medium transition duration-200",
        className,
      )}
      style={{
        height,
        width,
        fontSize,
        borderRadius,
      }}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      ) : (
        text
      )}
    </button>
  );
}
