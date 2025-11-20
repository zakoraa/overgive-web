import React from "react";
import { Card } from "@/components/ui/card";

interface BasePageProps {
  children: React.ReactNode;
  className?: string;
}

export default function BasePage({ children, className = "" }: BasePageProps) {
  return (
    <Card
      className={`container mx-auto flex flex-col items-center justify-center space-y-2 rounded-none pb-5 md:max-w-[550px] ${className}`}
    >
      {children}
    </Card>
  );
}
