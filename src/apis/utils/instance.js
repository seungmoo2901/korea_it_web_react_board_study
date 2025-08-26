/**
 * Axios
 * 요청에 받아온 데이터를 respose.data에서 바로 받아볼 수 있다.
 * 
 * 직관적인 에러처리
 * 서버의 API를 찾을 수 없거나(404) 서버 내부에 문제(500)가 생겼을때
  fetch()는 이를 성공적인 요청으로 간주하지만 axios는
 서버 에러를 실패로 처리해서 try...catch구문으로 쉽게 잡아낼수 있다
 * 
 * 요청/응답 가로채기 (Interceptors)
 * 모든 요청이 보내지기 전이나 모든 응답이 도착한 후에 중간 지점에서 
   공통 작업을 처리할 수 있다.
 * 예를들어 모든 요청에 토큰을 자동으로 추가하거나 
 *특정 에러코드가 오면 자동으로 로그인 페이지로 보내는 등의 처리를 할 수 있다.
 */

import axios from "axios";

// 특정 postId에 해당하는 게시물을 가져오는 함수
export const fetchPost = async (postId) => {
  try {
    // axios.get을 사용해 JSONPlaceholder의 posts API에서 특정 게시물 요청
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    // 응답 데이터 출력 (게시물의 내용이 들어있음)
    console.log(response.data);
  } catch (error) {
    // 요청 중 에러 발생 시 에러 출력
    console.log(error);
  }
};

// JSONPlaceholder API를 기본 주소로 하는 axios 인스턴스 생성
export const jsonInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// 로컬 서버(백엔드) API를 기본 주소로 하는 axios 인스턴스 생성
export const instance = axios.create({
  baseURL: "http://localhost:8080",
});
