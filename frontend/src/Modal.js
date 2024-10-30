import React from 'react';
import styles from './Modal.module.css'; // Import the CSS module

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <button className={styles['modal-close']} onClick={onClose}>
          &times;
        </button>
        <div className={styles['content']}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
