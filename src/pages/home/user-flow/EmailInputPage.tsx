import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendResultEmail } from "@/api/transmission";
import styles from "@/styles/EmailInputPage.module.css";

export function EmailInputPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    const userId = localStorage.getItem("saju_user_id");
    if (!userId) {
      alert("사용자 정보를 찾을 수 없습니다.");
      navigate("/");
      return;
    }

    setIsSubmitting(true);
    try {
      const finalPhoto = localStorage.getItem("final_four_cut_photo") || undefined;
      await sendResultEmail(userId, email, finalPhoto);
      alert("이메일이 전송되었습니다. 만약 메일이 오지 않는다면 스팸함을 확인해주세요.");
      
      // 전송 성공 시 임시 저장된 사진 삭제
      localStorage.removeItem("final_four_cut_photo");
      
      navigate("/");
    } catch (err) {
      console.error("이메일 전송 실패:", err);
      alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>사진을 보내드려요</p>
      <p className={styles.disclaimer}>*정보는 저장되지 않습니다</p>
      <div className={styles.inputGroup}>
        <p className={styles.emailLabel}>이메일</p>
        <input
          className={styles.emailInput}
          type="email"
          placeholder="ex) d2421@e-mirim.hs.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
          disabled={isSubmitting}
        />
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "전송 중..." : "입력완료"}
        </button>
      </div>
    </div>
  );
}
