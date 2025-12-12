import { Modal } from "./modal";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;

  isSuccess: boolean; // true = success, false = error
  message: string;
}

export const ModalInfo: React.FC<ModalInfoProps> = ({
  isOpen,
  onClose,
  isSuccess,
  message,
}) => {
  const title = isSuccess ? "Berhasil!" : "Gagal!";
  const imageUrl = isSuccess ? "/svgs/success.svg" : "/svgs/failed.svg";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative mx-auto flex max-w-sm flex-col items-center justify-center space-y-4 px-4 py-6 text-center">
        {/* SVG via Image */}
        <img
          src={imageUrl}
          alt={title}
          className="mb-2 h-20 w-20 object-contain"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {/* Message */}
        <p
          className="text-sm leading-relaxed text-gray-600"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </Modal>
  );
};
