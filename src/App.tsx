import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { UserForm } from "./pages/home/UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;