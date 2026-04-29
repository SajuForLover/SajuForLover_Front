import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { UserForm } from "./pages/home/UserForm";
import { Camera } from "./pages/home/Camera"; // Camera 컴포넌트 임포트 추가
import { Filming } from "./pages/home/Filming"; // Filming 컴포넌트 임포트 추가
import { FilmingCompleted } from "./pages/home/FilmingCompleted"; // FilmingCompleted 임포트
import { PersonalityTest } from "./pages/home/PersonalityTest"; // PersonalityTest 임포트 추가

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
      </Routes>
    </Router>
  );
}

export default App;