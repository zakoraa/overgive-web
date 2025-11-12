import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`bg-background rounded-2xl border border-zinc-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
