"use client"
import styles from '@/components/modal/modal.module.css'
import React from 'react';


// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

const Modal = ({ isOpen, onClose, children }:any) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;