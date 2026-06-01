import React from "react";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import styles from "./ResponsiveLayout.module.css";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  designWidth?: number;
  designHeight?: number;
  className?: string;
  allowScroll?: boolean;
}

/**
 * 전역적으로 1920x1080 (기본) 디자인 사이즈를 브라우저 크기에 맞춰 스케일링하는 레이아웃 컴포넌트
 */
export function ResponsiveLayout({
  children,
  designWidth = 1920,
  designHeight = 1080,
  className = "",
  allowScroll = true,
}: ResponsiveLayoutProps) {
  const scale = useResponsiveScale();

  const viewportStyle: React.CSSProperties = {
    overflowY: allowScroll ? "auto" : "hidden",
  };

  const canvasStyle: React.CSSProperties = {
    width: designWidth,
    height: designHeight,
    transform: `scale(${scale})`,
    transformOrigin: "top left",
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
