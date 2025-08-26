import { Route, Routes } from "react-router-dom"; 
// React Router v6에서 페이지 이동을 관리하기 위한 컴포넌트들을 import

import Home from "../../pages/Home/Home";   
import Write from "../../pages/Write/Write"; 
import Board from "../../pages/Board/Board"; 
import AuthRouter from "../AuthRouter/AuthRouter"; 

function MainRouter() {
  return (
    <>
      <Routes> 
        {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
        
        {/* "/" 경로로 접속했을 때 Home 컴포넌트를 보여줌 */}
        <Route path="/" element={<Home />} /> 
        
        {/* "/board" 경로로 접속했을 때 Board 컴포넌트를 보여줌 */}
        <Route path="/board" element={<Board />} />
        
        {/* "/write" 경로로 접속했을 때 Write 컴포넌트를 보여줌 */}
        <Route path="/write" element={<Write />} /> 
        
        {/* "/auth/*" 경로는 AuthRouter가 관리 
            예: /auth/login, /auth/signup 등 하위 경로들을 AuthRouter에서 처리 */}
        <Route path="/auth/*" element={<AuthRouter />} /> 
      </Routes>
    </>
  );
}

export default MainRouter; 

