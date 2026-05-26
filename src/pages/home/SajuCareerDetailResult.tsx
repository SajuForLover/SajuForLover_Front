import { useState } from "react";
import styles from "./SajuCareerDetailResult.module.css";

interface Props { hideBg?: boolean; }

export function SajuCareerDetailResult({ hideBg = false }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.root} style={hideBg ? { backgroundColor: 'transparent' } : undefined}>
      {/* 배경 */}
      {!hideBg && <div className={styles.bgImage} />}
      {!hideBg && <div className={styles.midSection} />}
      {!hideBg && <div className={styles.rightDivider} />}

      {/* 섹션 타이틀 */}
      <p className={styles.sectionTitle}>나의 일잘러 성향 리포트</p>

      {/* 돋보기(검색) 아이콘 */}
      <div className={styles.searchIcon} onClick={() => setShowModal(true)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" />
          <line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 추천 직업 바 */}
      <div className={`${styles.infoBar} ${styles.bar1}`}>
        <span className={styles.infoLabel}>추천 직업</span>
        <div className={styles.barDivider} />
        <span className={styles.infoValue}>부동산 자산운용가, 플랫폼 운영 기획자, 전통장인</span>
      </div>

      {/* 업무 스타일 바 */}
      <div className={`${styles.infoBar} ${styles.bar2}`}>
        <span className={styles.infoLabel}>업무 스타일</span>
        <div className={styles.barDivider} />
        <span className={styles.infoValue}>혼자서 묵묵히 목표를 달성하는 '고독한 사냥꾼' 스타일</span>
      </div>

      {/* 주의할 점 바 */}
      <div className={`${styles.infoBar} ${styles.bar3}`}>
        <span className={styles.infoLabel}>주의할 점</span>
        <div className={styles.barDivider} />
        <span className={styles.infoValue}>고집이 너무 세서 팀원들이 숨막혀 할 수 있음!</span>
      </div>

      {/* 최고의 파트너 */}
      <h3 className={styles.partnerTitleLeft}>최고의 파트너</h3>
      <div className={styles.partnerImgLeft} />
      <p className={styles.partnerDescLeft}>{'따뜻한 햇살 같은 캐릭터\n(화 기운)'}</p>

      {/* 조심할 파트너 */}
      <h3 className={styles.partnerTitleRight}>조심할 파트너</h3>
      <div className={styles.partnerImgRight} />
      <p className={styles.partnerDescRight}>{'나를 자꾸 베어내려는 예리한 캐릭터\n(금 기운)'}</p>

      {/* 화이트 딤 오버레이 + 모달 */}
      {showModal && (
        <>
          <div className={styles.dimOverlay} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <div className={styles.modalInner}>
              <h2 className={styles.modalTitle}>나의 일잘러 성향 리포트란?</h2>
              <p className={styles.modalSubtitle}>
                종합적인 사주 기운을 바탕으로, 실제 환경에서 내가 어떤 방식으로 일하고 타인과 어떻게 상호작용하는지 분석한 리포트입니다.
              </p>
              <p className={styles.modalBody}>
                {'• 추천 직업 : 타고난 자산 관리 능력과 끈기, 기획력을 가장 잘 발휘할 수 있는 최적의 직무 분야를 제안합니다.\n• 업무 스타일 : 협업보다는 혼자서 묵묵히 목표를 달성할 때 최고의 효율을 내는 행동 성향을 분석합니다.\n• 주의할 점 : 주관과 고집이 강해 협업 시 팀원들이 느낄 수 있는 답답함을 미연에 방지하기 위한 조언입니다.\n• 파트너 궁합 : 나에게 부족한 기운을 채워주는 최고의 파트너와, 나를 자극하거나 대립하기 쉬운 기운의 조심할 파트너를 알려줍니다.'}
              </p>
              <div className={styles.modalButton}>
                <span className={styles.modalButtonText}>내 사주 성향 리포트 분석 보러가기</span>
              </div>
            </div>
            {/* X 닫기 버튼 */}
            <div className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</div>
          </div>
        </>
      )}
    </div>
  );
}
