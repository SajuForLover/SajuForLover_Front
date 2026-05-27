import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/Group 88.png";
import pinkEffect from "../../assets/images/pinkEffect.png";
import bg2 from "../../assets/images/background2.png";
import bg4 from "../../assets/images/background4.png";
import styles from "./ResultLayout.module.css";

const TABS = ["캐릭터", "능력치", "라이프", "부스터", "운의 흐름"] as const;
export type ResultTab = typeof TABS[number];

const TAB_ROUTES: Record<ResultTab, string> = {
  "캐릭터":   "/saju-character",
  "능력치":   "/saju-ability",
  "라이프":   "/saju-life",
  "부스터":   "/saju-booster",
  "운의 흐름": "/saju-fortune",
};

interface Props {
  activeTab: ResultTab;
  children: React.ReactNode;
  bg?: "bg2" | "bg4";
  onTabClick?: (tab: ResultTab) => void;
}

export function ResultLayout({ activeTab, children, bg = "bg2", onTabClick }: Props) {
  const navigate = useNavigate();
  const bgSrc = bg === "bg4" ? bg4 : bg2;
  return (
    <div className={styles.root}>
      <div className={styles.bgImage} style={{ backgroundImage: `url(${bgSrc})` }} />
      <img src={logoImg} alt="애인사주오!" className={styles.logo} />
      <nav className={styles.tabNav}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`${styles.tab}${activeTab === tab ? ` ${styles.tabActive}` : ""}`}
            onClick={onTabClick ? () => onTabClick(tab) : () => navigate(TAB_ROUTES[tab])}
          >
            {tab}
          </button>
        ))}
      </nav>
      {children}
      <img src={pinkEffect} alt="" className={styles.pinkEffect} />
    </div>
  );
}
