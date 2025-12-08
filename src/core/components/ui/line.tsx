interface LineProps {
  className?: string;
}

export const Line = ({ className = "" }: LineProps) => {
  return (
    <div
      className={`mt-2 mb-4 h-[1.5px] w-full rounded-4xl bg-gray-300 ${className}`}
    />
  );
};
