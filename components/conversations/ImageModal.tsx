'use client';

import { Modal } from "@/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src: string | null;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
}) => {

  if (!src) {
     return null
  }

  return <Modal isOpen={isOpen} onClose={onClose}>
    <div className="w-80 h-80">
      <Image src={src} alt="image" className="object-cover" fill/>
    </div>
  </Modal>;
};
