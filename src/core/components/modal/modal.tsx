import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  disableClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
  disableClose = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !disableClose) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, disableClose]);

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full rounded-none"
    : "w-full max-w-md rounded-2xl bg-white shadow-xl";

  return createPortal(
    <div
      className="animate-fadeIn fixed inset-0 z-9999 flex items-center justify-center bg-black/40"
      onClick={() => {
        if (!disableClose) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={`animate-scaleIn relative p-0 ${contentClasses} ${className || ""} `}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && !isFullscreen && !disableClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 shadow-sm transition hover:bg-gray-200 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-6">{children}</div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0 }
          100% { opacity: 1 }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn .2s ease-out; }
        .animate-scaleIn { animation: scaleIn .2s ease-out; }
      `}</style>
    </div>,
    document.body,
  );
};
