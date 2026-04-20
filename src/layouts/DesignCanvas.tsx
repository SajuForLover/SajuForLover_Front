import type { ReactNode } from "react";
import styles from "./DesignCanvas.module.css";

type DesignCanvasProps = {
  children?: ReactNode;
};

/**
 * 고정 디자인 캔버스(1920×1080). 작은 화면에서는 가로 스크롤로 전체를 볼 수 있습니다.
 */
export function DesignCanvas({ children }: DesignCanvasProps) {
  return (
    <div className={styles.viewport}>
      <div className={styles.canvas}>{children}</div>
    </div>
  );
}
