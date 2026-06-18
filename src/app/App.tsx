import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { DesignCanvas } from "@/layouts/DesignCanvas";
import { useEffect } from "react";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";

// soyoung pages
// ... (나머지 임포트 동일)
import { HomePage } from "@/pages/home/user-flow/HomePage";
import { UserForm } from "@/pages/home/user-flow/UserForm";
import { Camera } from "@/pages/home/user-flow/Camera";
import { Filming } from "@/pages/home/user-flow/Filming";
import { FilmingCompleted } from "@/pages/home/user-flow/FilmingCompleted";
import { PersonalityTest } from "@/pages/home/user-flow/personalityTest";
import { ResultLoading } from "@/pages/home/user-flow/ResultLoading";
import { CoronalResults } from "@/pages/home/results/CoronalResults";
import { SajuInfoScrollPage } from "@/pages/home/results/SajuInfoScrollPage";
import { EmailInputPage } from "@/pages/home/user-flow/EmailInputPage";

// character flow pages
import { GenericSajuResultPage } from "@/pages/character-flow/GenericSajuResultPage";
import { GenericPhotoShootPage } from "@/pages/character-flow/GenericPhotoShootPage";
import { GenericPhotoShootResultPage } from "@/pages/character-flow/GenericPhotoShootResultPage";

function DesignCanvasLayout() {
  return (
    <DesignCanvas>
      <Outlet />
    </DesignCanvas>
  );
}

export function App() {
  const location = useLocation();
  useIdleTimeout();

  useEffect(() => {
    // 홈페이지("/")로 이동 시 또는 페이지 리로드(새로고침) 시 세션 초기화
    if (location.pathname === "/") {
      sessionStorage.clear();
    }
  }, [location]);

  return (
    <Routes>
      {/* ... (기존 Routes 동일) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/user-form" element={<UserForm />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/filming" element={<Filming />} />
      <Route path="/filming-completed" element={<FilmingCompleted />} />
      <Route path="/personality" element={<PersonalityTest />} />
      <Route path="/result-loading" element={<ResultLoading />} />
      <Route path="/coronal-result" element={<CoronalResults />} />
      <Route path="/email-input" element={<EmailInputPage />} />

      {/* ── chaeyi flow: 사주 결과 → 네컷 촬영 (DesignCanvas 내부) ── */}
      <Route path="/character/:characterId" element={<GenericSajuResultPage />} />

      <Route element={<DesignCanvasLayout />}>
        <Route path="/photo-shoot/:characterId" element={<GenericPhotoShootPage />} />
        <Route path="/photo-shoot/:characterId/result" element={<GenericPhotoShootResultPage />} />
      </Route>

      {/* ── soyoung flow (복귀): 종합 사주 결과 ── */}
      <Route path="/saju-result" element={<SajuInfoScrollPage />} />
    </Routes>
  );
}
