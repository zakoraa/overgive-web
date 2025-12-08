import { Modal } from "./modal";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  message: string;
  imageUrl?: string; // gambar SVG via URL
}

export const ModalInfo: React.FC<ModalInfoProps> = ({
  isOpen,
  onClose,
  title,
  message,
  imageUrl,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative mx-auto flex max-w-sm flex-col items-center justify-center space-y-4 px-4 py-6 text-center">
        {/* SVG via Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="status"
            className="mb-2 h-20 w-20 object-contain"
          />
        )}

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
