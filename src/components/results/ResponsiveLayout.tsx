import React, { useLayoutEffect, useState } from "react";
import styles from "./ResponsiveLayout.module.css";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  designWidth?: number;
  designHeight?: number;
  className?: string;
  allowScroll?: boolean;
}

/**
 * 전역적으로 디자인 사이즈를 브라우저 크기에 맞춰 스케일링하는 레이아웃 컴포넌트
 */
export function ResponsiveLayout({
  children,
  designWidth = 1920,
  designHeight = 1080,
  className = "",
  allowScroll = true,
}: ResponsiveLayoutProps) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    function update() {
      const wScale = window.innerWidth / designWidth;
      const hScale = window.innerHeight / designHeight;
      // 화면에 빈 공간 없이 꽉 차게 하려면 Math.max를 사용
      setScale(Math.max(wScale, hScale));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [designWidth, designHeight]);

  const viewportStyle: React.CSSProperties = {
    overflowY: allowScroll ? "auto" : "hidden",
    display: "flex",
    justifyContent: "center", // 중앙 정렬
  };

  const canvasStyle: React.CSSProperties = {
    width: designWidth,
    height: designHeight,
    transform: `scale(${scale})`,
    transformOrigin: "center top", // 상단 중앙 기준
  };

  return (
    <div className={styles.viewport} style={viewportStyle}>
      <div className={styles.canvas} style={canvasStyle}>
        <div className={`${styles.root} ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
