import { Route, Routes } from "react-router-dom";
import { DesignCanvas } from "@/layouts/DesignCanvas";
import { HomePage } from "@/pages/home/HomePage";
import { YoonSeaPhotoShootPage } from "@/pages/yoon-sea-photo-shoot/YoonSeaPhotoShootPage";

export function App() {
  return (
    <DesignCanvas>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/yoon-sea-photo-shoot"
          element={<YoonSeaPhotoShootPage />}
        />
      </Routes>
    </DesignCanvas>
  );
}
