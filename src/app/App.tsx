import { Outlet, Route, Routes } from "react-router-dom";
import { DesignCanvas } from "@/layouts/DesignCanvas";

// soyoung pages
import { HomePage } from "@/pages/home/HomePage";
import { UserForm } from "@/pages/home/UserForm";
import { Camera } from "@/pages/home/Camera";
import { Filming } from "@/pages/home/Filming";
import { FilmingCompleted } from "@/pages/home/FilmingCompleted";
import { PersonalityTest } from "@/pages/home/personalityTest";
import { ResultLoading } from "@/pages/home/ResultLoading";
import { CoronalResults } from "@/pages/home/CoronalResults";
import { SajuCharacterResult } from "@/pages/home/SajuCharacterResult";
import { SajuAbilityResult } from "@/pages/home/SajuAbilityResult";
import { SajuLifeResult } from "@/pages/home/SajuLifeResult";
import { SajuBoosterResult } from "@/pages/home/SajuBoosterResult";
import { SajuFortuneResult } from "@/pages/home/SajuFortuneResult";
import { SajuOhaengResult } from "@/pages/home/SajuOhaengResult";
import { SajuInfoScrollPage } from "@/pages/home/SajuInfoScrollPage";
import { EmailInputPage } from "@/pages/home/EmailInputPage";

// chaeyi photo shoot pages
import { YoonSeaPhotoShootPage } from "@/pages/yoon-sea-photo-shoot/YoonSeaPhotoShootPage";
import { YoonSeaPhotoShootResultPage } from "@/pages/yoon-sea-photo-shoot-result/YoonSeaPhotoShootResultPage";
import { HaramPhotoShootPage } from "@/pages/haram-photo-shoot/HaramPhotoShootPage";
import { HaramPhotoShootResultPage } from "@/pages/haram-photo-shoot-result/HaramPhotoShootResultPage";
import { NayeonPhotoShootPage } from "@/pages/nayeon-photo-shoot/NayeonPhotoShootPage";
import { NayeonPhotoShootResultPage } from "@/pages/nayeon-photo-shoot-result/NayeonPhotoShootResultPage";
import { SoohooPhotoShootPage } from "@/pages/soohoo-photo-shoot/SoohooPhotoShootPage";
import { SoohooPhotoShootResultPage } from "@/pages/soohoo-photo-shoot-result/SoohooPhotoShootResultPage";
import { JaehyunPhotoShootPage } from "@/pages/jaehyun-photo-shoot/JaehyunPhotoShootPage";
import { JaehyunPhotoShootResultPage } from "@/pages/jaehyun-photo-shoot-result/JaehyunPhotoShootResultPage";
import { ChanyoungPhotoShootPage } from "@/pages/chanyoung-photo-shoot/ChanyoungPhotoShootPage";
import { ChanyoungPhotoShootResultPage } from "@/pages/chanyoung-photo-shoot-result/ChanyoungPhotoShootResultPage";

// chaeyi saju result pages
import { YoonSeaSajuResultPage } from "@/pages/yoon-sea-saju-result/YoonSeaSajuResultPage";
import { HaramSajuResultPage } from "@/pages/haram-saju-result/HaramSajuResultPage";
import { NayeonSajuResultPage } from "@/pages/nayeon-saju-result/NayeonSajuResultPage";
import { SoohooSajuResultPage } from "@/pages/soohoo-saju-result/SoohooSajuResultPage";
import { JaehyunSajuResultPage } from "@/pages/jaehyun-saju-result/JaehyunSajuResultPage";
import { ChanyoungSajuResultPage } from "@/pages/chanyoung-saju-result/ChanyoungSajuResultPage";

function DesignCanvasLayout() {
  return (
    <DesignCanvas>
      <Outlet />
    </DesignCanvas>
  );
}

export function App() {
  return (
    <Routes>
      {/* ── soyoung flow: 메인 → 사용자 정보 → 촬영 → 성격 테스트 → 결과 생성 ── */}
      <Route path="/" element={<HomePage />} />
      <Route path="/user-form" element={<UserForm />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/filming" element={<Filming />} />
      <Route path="/filming-completed" element={<FilmingCompleted />} />
      <Route path="/personality" element={<PersonalityTest />} />
      <Route path="/result-loading" element={<ResultLoading />} />
      <Route path="/results" element={<CoronalResults />} />
      <Route path="/email-input" element={<EmailInputPage />} />

      {/* ── chaeyi flow: 사주 결과 → 네컷 촬영 (DesignCanvas 내부) ── */}
      <Route path="/yoon-sea-saju-result" element={<YoonSeaSajuResultPage />} />
      <Route path="/haram-saju-result" element={<HaramSajuResultPage />} />
      <Route path="/nayeon-saju-result" element={<NayeonSajuResultPage />} />
      <Route path="/soohoo-saju-result" element={<SoohooSajuResultPage />} />
      <Route path="/jaehyun-saju-result" element={<JaehyunSajuResultPage />} />
      <Route path="/chanyoung-saju-result" element={<ChanyoungSajuResultPage />} />

      <Route element={<DesignCanvasLayout />}>
        <Route path="/yoon-sea-photo-shoot" element={<YoonSeaPhotoShootPage />} />
        <Route path="/yoon-sea-photo-shoot/result" element={<YoonSeaPhotoShootResultPage />} />
        <Route path="/haram-photo-shoot" element={<HaramPhotoShootPage />} />
        <Route path="/haram-photo-shoot/result" element={<HaramPhotoShootResultPage />} />
        <Route path="/nayeon-photo-shoot" element={<NayeonPhotoShootPage />} />
        <Route path="/nayeon-photo-shoot/result" element={<NayeonPhotoShootResultPage />} />
        <Route path="/soohoo-photo-shoot" element={<SoohooPhotoShootPage />} />
        <Route path="/soohoo-photo-shoot/result" element={<SoohooPhotoShootResultPage />} />
        <Route path="/jaehyun-photo-shoot" element={<JaehyunPhotoShootPage />} />
        <Route path="/jaehyun-photo-shoot/result" element={<JaehyunPhotoShootResultPage />} />
        <Route path="/chanyoung-photo-shoot" element={<ChanyoungPhotoShootPage />} />
        <Route path="/chanyoung-photo-shoot/result" element={<ChanyoungPhotoShootResultPage />} />
      </Route>

      {/* ── soyoung flow (복귀): 종합 사주 결과 ── */}
      <Route path="/saju-ohaeng" element={<SajuOhaengResult />} />
      <Route path="/saju-character" element={<SajuCharacterResult />} />
      <Route path="/saju-ability" element={<SajuAbilityResult />} />
      <Route path="/saju-life" element={<SajuLifeResult />} />
      <Route path="/saju-booster" element={<SajuBoosterResult />} />
      <Route path="/saju-fortune" element={<SajuFortuneResult />} />
      <Route path="/saju-ohaeng-info" element={<SajuInfoScrollPage />} />
    </Routes>
  );
}
