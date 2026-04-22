import {
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./DesignCanvas.module.css";

const DESIGN_W = 1920;
const DESIGN_H = 1080;

type DesignCanvasProps = {
  children?: ReactNode;
};

/**
 * 1920×1080 디자인 무대를 뷰포트에 비율 유지로 맞춤. 스크롤 없이 전체 화면을 사용합니다.
 */
export function DesignCanvas({ children }: DesignCanvasProps) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    function update() {
      setScale(
        Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H)
      );
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const stageStyle = {
    "--stage-scale": scale,
  } as CSSProperties;

  return (
    <div className={styles.viewport}>
      <div className={styles.stage} style={stageStyle}>
        <div className={styles.canvas}>{children}</div>
      </div>
    </div>
  );
}
