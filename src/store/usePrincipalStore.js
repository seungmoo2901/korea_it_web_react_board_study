import { create } from "zustand";

// 전역 상태 정의
export const usePrincipalState = create((set, get) => ({
  // 로그인 여부 상태 (초기값 false)
  isLoggedIn: false,

  // 사용자 정보 상태 (초기값 null)
  principal: null,

  // 로그인 함수
  login: (userData) =>
    set({
      isLoggedIn: true, // 로그인 상태 true로 변경
      principal: userData, // 사용자 정보 저장
    }),

  // 로그아웃 함수
  logout: () => {
    localStorage.removeItem("accessToken"); // 로컬스토리지에 저장된 토큰 삭제
    set({
      isLoggedIn: false, // 로그인 상태 false로 변경
      principal: null, // 사용자 정보 초기화
    });
  },
}));

/**
 * 전역 상태관리
 * Zustand
 *
 * 전역 상태관리를 사용하는 이유
 * 1. 컴포넌트간 상태공유
 * 2. Props Drilling방지
 *  - 코드 복잡성 증가
 *  - 유지보수 어려움
 *  - 불필요한 렌더링 유발
 * 3. 관심사 분리
 * 4. 상태예측 가능성
 */
