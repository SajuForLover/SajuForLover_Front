import { Route, Routes } from "react-router-dom";
import { DesignCanvas } from "@/layouts/DesignCanvas";
import { ChanyoungPhotoShootResultPage } from "@/pages/chanyoung-photo-shoot-result/ChanyoungPhotoShootResultPage";
import { ChanyoungPhotoShootPage } from "@/pages/chanyoung-photo-shoot/ChanyoungPhotoShootPage";
import { HomePage } from "@/pages/home/HomePage";
import { HaramPhotoShootResultPage } from "@/pages/haram-photo-shoot-result/HaramPhotoShootResultPage";
import { HaramPhotoShootPage } from "@/pages/haram-photo-shoot/HaramPhotoShootPage";
import { JaehyunPhotoShootResultPage } from "@/pages/jaehyun-photo-shoot-result/JaehyunPhotoShootResultPage";
import { JaehyunPhotoShootPage } from "@/pages/jaehyun-photo-shoot/JaehyunPhotoShootPage";
import { NayeonPhotoShootResultPage } from "@/pages/nayeon-photo-shoot-result/NayeonPhotoShootResultPage";
import { NayeonPhotoShootPage } from "@/pages/nayeon-photo-shoot/NayeonPhotoShootPage";
import { SoohooPhotoShootResultPage } from "@/pages/soohoo-photo-shoot-result/SoohooPhotoShootResultPage";
import { SoohooPhotoShootPage } from "@/pages/soohoo-photo-shoot/SoohooPhotoShootPage";
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
        <Route
          path="/haram-photo-shoot"
          element={<HaramPhotoShootPage />}
        />
        <Route
          path="/haram-photo-shoot/result"
          element={<HaramPhotoShootResultPage />}
        />
        <Route
          path="/nayeon-photo-shoot"
          element={<NayeonPhotoShootPage />}
        />
        <Route
          path="/nayeon-photo-shoot/result"
          element={<NayeonPhotoShootResultPage />}
        />
        <Route
          path="/soohoo-photo-shoot"
          element={<SoohooPhotoShootPage />}
        />
        <Route
          path="/soohoo-photo-shoot/result"
          element={<SoohooPhotoShootResultPage />}
        />
        <Route
          path="/jaehyun-photo-shoot"
          element={<JaehyunPhotoShootPage />}
        />
        <Route
          path="/jaehyun-photo-shoot/result"
          element={<JaehyunPhotoShootResultPage />}
        />
        <Route
          path="/chanyoung-photo-shoot"
          element={<ChanyoungPhotoShootPage />}
        />
        <Route
          path="/chanyoung-photo-shoot/result"
          element={<ChanyoungPhotoShootResultPage />}
        />
      </Routes>
    </DesignCanvas>
  );
}
