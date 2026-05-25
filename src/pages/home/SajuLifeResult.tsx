import styles from "./SajuLifeResult.module.css";

interface JobCard {
  title: string;
  description: string[];
  image?: string;
}

interface Props {
  jobs?: [JobCard, JobCard];
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

export function SajuLifeResult({ jobs = DEFAULT_JOBS }: Props) {
  return (
    <div className={styles.root}>
      {/* 배경 이미지 */}
      <div className={styles.bgImage} />

      {/* 하단 핑크 그라데이션 */}
      <div className={styles.bottomGradient} />

      {/* 로고 */}
      <div className={styles.logo}>애인사주오!</div>

      {/* 탭 네비게이션 */}
      <nav className={styles.tabNav}>
        <button className={styles.tab}>캐릭터</button>
        <button className={styles.tab}>능력치</button>
        <button className={`${styles.tab} ${styles.tabActive}`}>라이프</button>
        <button className={styles.tab}>부스터</button>
        <button className={styles.tab}>운의 흐름</button>
      </nav>

      {/* 섹션 타이틀 */}
      <h2 className={styles.sectionTitle}>현대판 추천 직업군</h2>

      {/* 직업 카드 2개 */}
      <div className={styles.cardsRow}>
        {jobs.map((job, i) => (
          <div key={i} className={styles.card}>
            {/* 왼쪽 원형 이미지 */}
            <div className={styles.cardCircle}>
              {job.image ? (
                <img src={job.image} alt={job.title} className={styles.cardImg} />
              ) : (
                <div className={styles.cardImgPlaceholder} />
              )}
            </div>

            {/* 오른쪽 텍스트 영역 */}
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
    </div>
  );
}
