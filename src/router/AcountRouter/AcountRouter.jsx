import { Route, Routes } from "react-router-dom";
import Profile from "../../pages/Profile/Profile";

function AcountRouter() {
  return (
    <>
      <Routes>
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
}

export default AcountRouter;
