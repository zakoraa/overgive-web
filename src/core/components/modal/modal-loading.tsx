"use client";

import { useState, useEffect } from "react";
import { Modal } from "./modal";
import CircularLoading from "../ui/circular-loading";

interface ModalLoadingProps {
  isOpen: boolean;
}

export const ModalLoading: React.FC<ModalLoadingProps> = ({ isOpen }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

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
