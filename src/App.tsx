import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { UserForm } from "./pages/home/UserForm";
import { Camera } from "./pages/home/Camera"; // Camera 컴포넌트 임포트 추가
import { Filming } from "./pages/home/Filming"; // Filming 컴포넌트 임포트 추가
import { FilmingCompleted } from "./pages/home/FilmingCompleted"; // FilmingCompleted 임포트
import { PersonalityTest } from "./pages/home/personalityTest";
import { ResultLoading } from "./pages/home/ResultLoading";
import { CoronalResults } from "./pages/home/CoronalResults";
import { SajuCharacterResult } from "./pages/home/SajuCharacterResult";
import { SajuAbilityResult } from "./pages/home/SajuAbilityResult";
import { SajuLifeResult } from "./pages/home/SajuLifeResult";
import { SajuBoosterResult } from "./pages/home/SajuBoosterResult";
import { SajuFortuneResult } from "./pages/home/SajuFortuneResult";
import { SajuOhaengResult } from "./pages/home/SajuOhaengResult";
import { SajuAbilityDetailResult } from "./pages/home/SajuAbilityDetailResult";
import { SajuCareerResult } from "./pages/home/SajuCareerResult";
import { SajuCareerDetailResult } from "./pages/home/SajuCareerDetailResult";
import { SajuAbilityInfoResult } from "./pages/home/SajuAbilityInfoResult";
import { SajuOhaengInfoResult } from "./pages/home/SajuOhaengInfoResult";
import { SajuInfoScrollPage } from "./pages/home/SajuInfoScrollPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/camera" element={<Camera />} /> {/* /camera 경로 추가 */}
        <Route path="/filming" element={<Filming />} /> {/* /filming 경로 추가 */}
        <Route path="/filming-completed" element={<FilmingCompleted />} /> {/* 결과 페이지 추가 */}
        <Route path="/personality" element={<PersonalityTest />} /> {/* PersonalityTest 페이지 라우트 추가 */}
        <Route path="/result-loading" element={<ResultLoading />} /> {/* 결과 생성 로딩 페이지 */}
        <Route path="/results" element={<CoronalResults />} /> {/* 결과 리포트 페이지 추가 */}
        <Route path="/saju-character" element={<SajuCharacterResult />} />
        <Route path="/saju-ability" element={<SajuAbilityResult />} />
        <Route path="/saju-life" element={<SajuLifeResult />} />
        <Route path="/saju-booster" element={<SajuBoosterResult />} />
        <Route path="/saju-fortune" element={<SajuFortuneResult />} />
        {/* <Route path="/c" element={<SajuOhaengResult />} /> */}
        {/* <Route path="/saju-ability-detail" element={<SajuAbilityDetailResult />} /> */}
        {/* <Route path="/saju-career" element={<SajuCareerResult />} /> */}
        <Route path="/saju-career-detail" element={<SajuCareerDetailResult />} />
        <Route path="/saju-ability-info" element={<SajuAbilityInfoResult />} />
        <Route path="/saju-ohaeng-info" element={<SajuInfoScrollPage />} />
        <Route path="/saju-info" element={<SajuInfoScrollPage />} />
      </Routes>
    </Router>
  );
}

export default App;