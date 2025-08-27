//board관련 API모음

import { instance } from "../utils/instance";
// axios instance를 utils 폴더에서 가져옴 (공통 설정된 axios 객체)

export const addBoardRequest = async (data) => {
  // 요청을 보내기 전에 인터셉터를 통해 토큰을 헤더에 추가
  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 꺼내옴

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // 토큰이 있으면 헤더에 Authorization 추가
    }
    return config; // 수정된 요청 설정 반환
  });

  try {
    // 서버에 POST 요청으로 게시글 등록
    const response = await instance.post("/board/add", data);
    return response; // 성공 시 서버 응답 반환
  } catch (error) {
    // 실패 시 에러 응답 반환
    return error.response;
  }
};

/**
 * 게시글 목록 조회 요청 함수
 */
export const getBoardList = async () => {
  try {
    // 서버에 GET 요청으로 게시글 목록 가져오기
    const response = await instance.get("/board/list");
    return response; // 성공 시 응답 반환
  } catch (error) {
    // 실패 시 에러 응답 반환
    return error.response;
  }
};
