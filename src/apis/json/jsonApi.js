import { jsonInstance } from "../utils/instance";

// 특정 게시물을 가져오는 함수 정의
export const getPostRequest = async (postId) => {
  try {
    // jsonInstance를 사용해 "/posts/{postId}" 경로로 GET 요청을 보냄
    // baseURL이 "https://jsonplaceholder.typicode.com" 이므로,
    // 실제 요청 URL은 "https://jsonplaceholder.typicode.com/posts/{postId}" 가 됨
    const response = await jsonInstance.get(`/posts/${postId}`);

    // 요청 성공 시 응답 객체를 반환
    return response;
  } catch (error) {
    // 요청 실패 시 백엔드에서 내려준 에러 응답을 반환
    return error.response;
  }
};
