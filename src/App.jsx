import { BrowserRouter } from "react-router-dom";
// React Router의 BrowserRouter import
// 앱 전체에서 라우팅 기능을 사용 가능하게 함

import Layout from "./components/LayOut/LayOut";
// 공통 레이아웃 컴포넌트 import (헤더, 푸터, 사이드바 등)

import MainRouter from "./router/MainRouter/MainRouter";
// 앱의 메인 라우터 import (홈, 게시판, 글쓰기, 인증 라우터 등)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// React Query를 사용하기 위한 import
// 서버 상태 관리, API 요청 캐싱 등을 담당

// React Query의 클라이언트 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  return (
    // React Query 전역 제공
    <QueryClientProvider client={queryClient}>
      {/* 브라우저 라우터로 앱 전체 라우팅 기능 적용 */}
      <BrowserRouter>
        {/* Layout 컴포넌트: 헤더, 푸터 등 공통 레이아웃 감싸기 */}
        <Layout>
          {/* 메인 페이지 라우터: 실제 페이지 렌더링 */}
          <MainRouter />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
// App 컴포넌트를 다른 파일에서 import해서 사용 가능
