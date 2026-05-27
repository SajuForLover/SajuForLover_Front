import { ResultLayout, type ResultTab } from "./ResultLayout";
import styles from "./SajuLifeResult.module.css";

interface JobCard {
  title: string;
  description: string[];
  image?: string;
}

interface Props {
  jobs?: [JobCard, JobCard];
  onTabClick?: (tab: ResultTab) => void;
}

const DEFAULT_JOBS: [JobCard, JobCard] = [
  {
    title: "IT 개발자",
    description: [
      "데이터 기반 문제 해결",
      "논리적 사고 중심 직무",
      "프론트엔드 · 백엔드 · AI 개발",
      "높은 성장 가능성과 수요",
      "협업 및 시스템 설계 역량",
    ],
  },
  {
    title: "콘텐츠 크리에이터",
    description: [
      "콘텐츠 제작 및 브랜딩",
      "영상 · 디자인 · SNS 기반 활동",
      "개인 감성과 아이디어 표현",
      "트렌드 반응형 직무",
      "자유로운 작업 스타일",
    ],
  },
];

export function SajuLifeResult({ jobs = DEFAULT_JOBS, onTabClick }: Props) {
  return (
    <ResultLayout activeTab="라이프" onTabClick={onTabClick}>
      <div className={styles.bottomGradient} />

      <h2 className={styles.sectionTitle}>현대판 추천 직업군</h2>

      <div className={styles.cardsRow}>
        {jobs.map((job, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardCircle}>
              {job.image ? (
                <img src={job.image} alt={job.title} className={styles.cardImg} />
              ) : (
                <div className={styles.cardImgPlaceholder} />
              )}
            </div>
            <div className={styles.cardContent}>
              <div className={styles.jobBadge}>
                <span className={styles.jobTitle}>{job.title}</span>
              </div>
              <ul className={styles.jobDesc}>
                {job.description.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ResultLayout>
  );
}
