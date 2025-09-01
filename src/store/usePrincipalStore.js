import { create } from "zustand";

export const usePrincipalState = create((set, get) => ({
  isLoggedIn: false,
  principal: null,

  login: (userData) => set({ isLoggedIn: true, principal: userData }),
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false, principal: null });
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