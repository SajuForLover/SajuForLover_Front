import logoImg from "../../assets/images/Group 88.png";
import pinkEffect from "../../assets/images/pinkEffect.png";
import styles from "./ResultLayout.module.css";

const TABS = ["캐릭터", "능력치", "라이프", "부스터", "운의 흐름"] as const;
export type ResultTab = typeof TABS[number];

interface Props {
  activeTab: ResultTab;
  children: React.ReactNode;
}

export function ResultLayout({ activeTab, children }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
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
