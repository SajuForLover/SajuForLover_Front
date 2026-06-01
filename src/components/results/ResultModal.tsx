import React from "react";
import styles from "./ResultModal.module.css";

interface ResultModalProps {
  title: string;
  subtitle: string;
  body: string;
  buttonText?: string;
  onClose: () => void;
}

export function ResultModal({
  title,
  subtitle,
  body,
  buttonText = "확인",
  onClose,
}: ResultModalProps) {
  return (
    <>
      <div className={styles.dimOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalInner}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalSubtitle}>{subtitle}</p>
          <p className={styles.modalBody}>{body}</p>
          <div className={styles.modalButton} onClick={onClose}>
            <span className={styles.modalButtonText}>{buttonText}</span>
          </div>
          <div className={styles.closeBtn} onClick={onClose}>✕</div>
        </div>
      </div>
    </>
  );
}
