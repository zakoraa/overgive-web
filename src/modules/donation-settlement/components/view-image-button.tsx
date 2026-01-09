import { useState } from "react";
import { EyeIcon } from "lucide-react";
import { AppButtonSm } from "@/core/components/button/app-button-sm";
import { Modal } from "@/core/components/modal/modal";

interface ViewImageButtonProps {
  imageUrl: string;
}

export const ViewImageButton = ({ imageUrl }: ViewImageButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppButtonSm
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-opacity-70 p-2!"
        icon={<EyeIcon className="h-4 w-4" />}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
        <div
          className="flex h-full w-full cursor-pointer items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={imageUrl}
            alt="Detail Image"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </Modal>
    </>
  );
};
