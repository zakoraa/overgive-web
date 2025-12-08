interface CircularLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

export default function CircularLoading({ size = "md" }: CircularLoadingProps) {
  return (
    <div className="text-primary text-center">
      <div
        className={`border-primary mx-auto animate-spin rounded-full border-t-2 ${sizeMap[size]}`}
      ></div>
    </div>
  );
}
