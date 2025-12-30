import { useRef, useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(isOpen);

  // handle mount & unmount animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !disableClose) onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, disableClose]);

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isVisible) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full rounded-none"
    : "w-full max-w-md rounded-2xl bg-white shadow-xl";

  const modalContent = (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} `}
      onClick={() => !disableClose && onClose()}
    >
      <div
        ref={modalRef}
        className={`relative transform transition-all duration-200 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"} ${contentClasses} ${className ?? ""} `}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && !isFullscreen && !disableClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 shadow-sm hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("modal-root") ?? document.body,
  );
};
