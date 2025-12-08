import React from "react";

interface DonationProgressIndicatorProps {
  percentage: number;
  className?: string;
}

export const DonationProgressIndicator: React.FC<
  DonationProgressIndicatorProps
> = ({ percentage, className }) => {
  return (
    <div
      className={`h-[5px] w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="to-primary from-primary-dark h-full bg-linear-to-r transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
