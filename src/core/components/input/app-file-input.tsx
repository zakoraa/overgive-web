import { Label } from "@/core/components/text/label";
import { FC, useState, useEffect } from "react";
import clsx from "clsx";
import ErrorInputMessage from "../ui/error-input-message";

interface AppFileInputProps {
  label: string;
  labelMessage?: string;
  name: string;
  error?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  hint?: string;
  initialUrl?: string | null;
}

export const AppFileInput: FC<AppFileInputProps> = ({
  label,
  labelMessage,
  name,
  onChange,
  error,
  accept,
  required = false,
  hint,
  initialUrl = null,
}) => {
  const [preview, setPreview] = useState<string | null>(initialUrl);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialUrl && !file) {
      setPreview(initialUrl);
    }
  }, [initialUrl, file]);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label text={label} htmlFor={name} required />
      {labelMessage && <p className="text-xs text-gray-500">{labelMessage}</p>}

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        required={required}
        onChange={handleChange}
        className={clsx(
          "rounded border p-2",
          error ? "border-red-500" : "border-gray-300",
        )}
      />

      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      <ErrorInputMessage error={error} />

      {preview && (
        <img
          src={preview}
          className="mt-2 aspect-auto rounded-lg border object-cover"
        />
      )}
    </div>
  );
};
