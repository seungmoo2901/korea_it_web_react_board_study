/** @jsxImportSource @emotion/react */
import { FcGoogle } from "react-icons/fc";
import * as s from "./styles";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthInput from "../../components/AuthInput/AuthInput";
import { signinRequest } from "../../apis/auth/authApis";

function Signin() {
  // 사용자 입력값을 상태로 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // 페이지 이동 함수

  // 회원가입 버튼 클릭 시 → 회원가입 페이지로 이동
  const signupOnClickHandler = () => {
    navigate("/auth/signup");
  };

  // 로그인 버튼 클릭 시 동작
  const signinOnClickHandler = () => {
    console.log(username, password); // 입력값 확인용 로그

    // 아이디/비밀번호가 비어있는 경우
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    } else {
      // 로그인 API 요청 보내기
      signinRequest({
        username: username,
        password: password,
      }).then((response) => {
        // 로그인 성공
        if (response.data.status === "success") {
          alert(response.data.message); // 성공 메시지 출력
          localStorage.setItem("accessToken", response.data.data);
          // 토큰을 localStorage에 저장
          window.location.href = "/"; // 메인 페이지로 새로고침 이동
        }
        // 로그인 실패
        else if (response.data.status === "failed") {
          alert(response.data.message); // 실패 메시지 출력
          return;
        }
      });
    }
  };

  return (
    <div css={s.container}>
      <h1>로그인</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type={"text"}
            placeholder={"아이디"}
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type={"password"}
            placeholder={"비밀번호"}
            state={password}
            setState={setPassword}
          />
        </div>
        <div css={s.signinBtnBox}>
          <button
            style={{ backgroundColor: "#6c757d" }}
            onClick={signupOnClickHandler}
          >
            회원가입
          </button>
          <button
            style={{ backgroundColor: "#0d6efd" }}
            onClick={signinOnClickHandler}
          >
            로그인
          </button>
        </div>
        <div css={s.oauthBtnBox}>
          <a href="http://localhost:8080/oauth2/authorization/google">
            <FcGoogle size={20} />
            <span>구글로 로그인</span>
          </a>
          <a>
            <SiNaver size={18} color="#03C75A" />
            <span>네이버로 로그인</span>
          </a>
          <a>
            <RiKakaoTalkFill size={20} color="#FEE500" />
            <span>카카오로 로그인</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
