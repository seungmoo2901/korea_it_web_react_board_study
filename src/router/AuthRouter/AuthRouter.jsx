import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../../pages/Signin/Signin";
import OAuth2 from "../../pages/OAuth2/OAuth2";
import OAuth2Signup from "../../pages/OAuth2Signup/OAuth2Signup";
import OAuth2Signin from "../../pages/OAuth2Signin/OAuth2Signin";
import OAuth2Merge from "../../pages/OAuth2Merge/OAuth2Merge";

function AuthRouter() {
  return (
    <>
      <Routes>
        {/* "/auth/signin" 경로 → Signin 컴포넌트 렌더링 */}
        <Route path="/signin" element={<Signin />} />

        {/* "/auth/signup" 경로 → Signup 컴포넌트 렌더링 */}
        <Route path="/signup" element={<Signup />} />

        {/* "/auth/oauth2" 경로 → OAuth2 컴포넌트 렌더링
            예: 구글/네이버/카카오 로그인 처리 후 리다이렉트 */}
        <Route path="/oauth2" element={<OAuth2 />} />

        {/* "/auth/oauth2/signup" 경로 → OAuth2Signup 컴포넌트 렌더링
            OAuth2로 로그인 시 추가 회원정보 입력이 필요한 경우 */}
        <Route path="/oauth2/signup" element={<OAuth2Signup />} />
        <Route path="/oauth2/signin" element={<OAuth2Signin />} />
        <Route path="/oauth2/merge" element={<OAuth2Merge />} />
      </Routes>
    </>
  );
}

export default AuthRouter;
