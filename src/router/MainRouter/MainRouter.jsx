import { Route, Routes } from "react-router-dom";
// React Router v6에서 페이지 이동을 관리하기 위한 컴포넌트들을 import

import Home from "../../pages/Home/Home";
import Write from "../../pages/Write/Write";
import Board from "../../pages/Board/Board";
import AuthRouter from "../AuthRouter/AuthRouter";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

function MainRouter() {
  return (
    <>
      <Routes>
        {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
        <Route path="/" element={<Home />} />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </>
  );
}

export default MainRouter;
