import logoImg from "../../assets/images/Group 88.png";
import pinkEffect from "../../assets/images/pinkEffect.png";
import bg2 from "../../assets/images/background2.png";
import bg4 from "../../assets/images/background4.png";
import styles from "./ResultLayout.module.css";

const TABS = ["캐릭터", "능력치", "라이프", "부스터", "운의 흐름"] as const;
export type ResultTab = typeof TABS[number];

interface Props {
  activeTab: ResultTab;
  children: React.ReactNode;
  bg?: "bg2" | "bg4";
}

export function ResultLayout({ activeTab, children, bg = "bg2" }: Props) {
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
