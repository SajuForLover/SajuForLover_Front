import { createContext, useContext, useEffect, useState } from "react";

interface IdleTimeoutContextValue {
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
}

const IdleTimeoutContext = createContext<IdleTimeoutContextValue>({
  disabled: false,
  setDisabled: () => {},
});

export function IdleTimeoutProvider({ children }: { children: React.ReactNode }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <IdleTimeoutContext.Provider value={{ disabled, setDisabled }}>
      {children}
    </IdleTimeoutContext.Provider>
  );
}

export function useIdleTimeoutContext() {
  return useContext(IdleTimeoutContext);
}

/**
 * 자동 진행 중인 작업(촬영 카운트다운, 결과 로딩 등)이 있을 때
 * idle 타이머를 일시 중지하기 위해 사용하는 훅.
 *
 * @param condition true일 때만 비활성화(기본값: true)
 */
export function useDisableIdleTimeout(condition = true) {
  const { setDisabled } = useIdleTimeoutContext();
  useEffect(() => {
    if (!condition) return;
    setDisabled(true);
    return () => setDisabled(false);
  }, [condition, setDisabled]);
}
