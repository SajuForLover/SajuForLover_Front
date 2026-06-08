/**
 * QuotaExceededError를 처리하는 안전한 sessionStorage 저장 유틸리티
 */
export const safeSetItem = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    if (e instanceof Error && e.name === 'QuotaExceededError') {
      console.error('세션 스토리지가 가득 찼습니다. 전체 데이터를 초기화합니다.');
      sessionStorage.clear();
      // 초기화 후 다시 시도
      try {
        sessionStorage.setItem(key, value);
      } catch (retryError) {
        console.error('초기화 후에도 저장에 실패했습니다:', retryError);
      }
    } else {
      console.error('스토리지 저장 실패:', e);
    }
  }
};
