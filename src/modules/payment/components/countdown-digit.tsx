"use client";

import { useEffect, useState } from "react";

interface Props {
  value: string;
}

export function CountdownDigit({ value }: Props) {
  const [display, setDisplay] = useState(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (value !== display) {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setDisplay(value);
        setAnimate(false);
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [value, display]);

  return (
    <div className="relative h-9 w-8 overflow-hidden rounded-lg bg-blue-500 text-md text-white ">
      <div
        className={`flex h-full items-center justify-center font-mono font-bold transition-transform duration-150 ${
          animate ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {display}
      </div>
      {animate && (
        <div className="absolute inset-0 flex translate-y-full items-center justify-center font-mono font-bold">
          {value}
        </div>
      )}
    </div>
  );
}
