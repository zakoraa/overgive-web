import { useEffect, useState } from "react";

interface CountdownResult {
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(expiredAt?: string): CountdownResult {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expiredAt) return;

    const target = new Date(expiredAt).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expiredAt]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return {
    minutes,
    seconds,
    isExpired: timeLeft <= 0,
  };
}
