import Link from "next/link";
import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  href?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  const baseClass =
    `bg-card-background w-full overflow-hidden rounded-2xl border border-zinc-300 ${className}`;

  if (!href) {
    return (
      <div className={baseClass} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      {children}
    </Link>
  );
};
