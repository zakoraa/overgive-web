import CircularLoading from "../ui/circular-loading";
import { Modal } from "./modal";

interface ModalLoadingProps {
  isOpen: boolean;
}

export const ModalLoading: React.FC<ModalLoadingProps> = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      showCloseButton={false}
      className="w-auto! px-10"
    >
      <div className="flex flex-col items-center justify-center py-6">
        <CircularLoading size="xl" />

        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          Loading
        </p>
      </div>
    </Modal>
  );
};
