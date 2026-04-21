// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 한 단계 더 위(src)로 나갔다가 pages로 들어가는 경로입니다 (../../)
import { HomePage } from "../pages/home/HomePage";
import { UserForm } from "../pages/home/UserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;