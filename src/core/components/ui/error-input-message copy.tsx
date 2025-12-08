interface ErrorInputMessageProps {
  error?: string;
}

export default function ErrorInputMessage({ error }: ErrorInputMessageProps) {
  return error && <span className="text-xs text-start text-red-500">{error}</span>;
}
