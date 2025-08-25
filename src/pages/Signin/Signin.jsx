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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupOnClickHandler = () => {
    navigate("/auth/signup");
  };

  const signinOnClickHandler = () => {
    console.log(username, password);
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    } else {
      // 로그인 API요청 보내기
      signinRequest({
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.status === "success") {
          alert(response.data.message);
          localStorage.setItem("accessToken", response.data.data);
          window.location.href = "/";
        } else if (response.data.status === "failed") {
          alert(response.data.message);
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
