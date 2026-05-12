import { Route, Routes } from "react-router-dom";
import { DesignCanvas } from "@/layouts/DesignCanvas";
import { HomePage } from "@/pages/home/HomePage";
import { YoonSeaPhotoShootPage } from "@/pages/yoon-sea-photo-shoot/YoonSeaPhotoShootPage";
import { YoonSeaPhotoShootResultPage } from "@/pages/yoon-sea-photo-shoot-result/YoonSeaPhotoShootResultPage";

export function App() {
  return (
    <DesignCanvas>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/yoon-sea-photo-shoot"
          element={<YoonSeaPhotoShootPage />}
        />
        <Route
          path="/yoon-sea-photo-shoot/result"
          element={<YoonSeaPhotoShootResultPage />}
        />
      </Routes>
    </DesignCanvas>
  );
}
