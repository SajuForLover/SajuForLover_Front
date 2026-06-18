import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIdleTimeoutContext } from "@/context/IdleTimeoutContext";

const IDLE_TIMEOUT_MS = 3 * 60 * 1000;
const HOME_PATH = "/";
const EVENTS: (keyof WindowEventMap)[] = [
  "click",
  "touchstart",
  "scroll",
  "mousemove",
  "keydown",
];

export function useIdleTimeout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { disabled } = useIdleTimeoutContext();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (location.pathname === HOME_PATH || disabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const reset = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        navigate(HOME_PATH);
      }, IDLE_TIMEOUT_MS);
    };

    reset();
    EVENTS.forEach((event) => window.addEventListener(event, reset, { passive: true }));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      EVENTS.forEach((event) => window.removeEventListener(event, reset));
    };
  }, [location.pathname, navigate, disabled]);
}
