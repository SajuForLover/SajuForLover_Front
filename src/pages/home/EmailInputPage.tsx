import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmailInputPage.module.css";

export function EmailInputPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit() {
    navigate("/saju-ohaeng-info");
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>사진을 보내드려요</p>
      <p className={styles.disclaimer}>*정보는 저장되지 않습니다</p>
      <p className={styles.emailLabel}>이메일</p>
      <input
        className={styles.emailInput}
        type="email"
        placeholder="ex) d2421@e-mirim.hs.kr"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
      />
      <button className={styles.submitButton} onClick={handleSubmit}>
        입력완료
      </button>
    </div>
  );
}
