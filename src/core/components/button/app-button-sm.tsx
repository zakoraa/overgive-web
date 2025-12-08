"use client";

import clsx from "clsx";

interface AppButtonSmProps {
  onClick?: () => void;
  className?: string;
  text?: string;
  icon?: React.ReactNode; // ← bisa masukin icon lucide-react
  type?: "button" | "submit";
}

export const AppButtonSm = ({
  text,
  icon,
  onClick,
  className,
  type = "button",
}: AppButtonSmProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "bg-primary flex cursor-pointer items-center justify-center gap-2 rounded-xl p-3 text-center text-sm font-semibold text-white",
        "transition duration-200 hover:opacity-70",
        className,
      )}
    >
      {icon && (
        <span className="flex h-5 w-5 items-center justify-center text-white">
          {icon}
        </span>
      )}
      {text && <span className="flex items-center justify-center">{text}</span>}
    </button>
  );
};
