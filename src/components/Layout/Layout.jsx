/** @jsxImportSource @emotion/react */
import { useQuery } from "@tanstack/react-query";
import { getPrincipalRequest } from "../../apis/auth/authApis";
import Header from "../Header/Header";
import * as s from "./styles";
import { useEffect } from "react";
import { usePrincipalState } from "../../store/usePrincipalStore";

function Layout({ children }) {
  // 로컬스토리지에서 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken");

  // 전역 상태 (로그인 여부, 사용자 정보, 로그인/로그아웃 함수)
  const { isLoggedIn, principal, login, logout } = usePrincipalState();

  // 사용자 정보 요청 (React Query 사용)
  const { data, isLoading } = useQuery({
    queryKey: ["getPrincipal"], // 캐시 키
    queryFn: getPrincipalRequest, // API 호출 함수
    refetch: 1, // refetch 설정 (1은 잘못된 값일 가능성 있음)
    enabled: !!accessToken, // 토큰이 있을 때만 실행
  });

  // 사용자 정보 요청 성공 시 전역 상태에 로그인 처리
  useEffect(() => {
    if (data?.data.status === "success") {
      login(data?.data.data);
    }
  }, [data, login]);

  return (
    <div css={s.layout}>
      {isLoading ? (
        <>
          <p>로딩중...</p>
        </>
      ) : (
        <>
          <Header />
          <div css={s.mainContainer}>{children}</div>
        </>
      )}
    </div>
  );
}

export default Layout;
