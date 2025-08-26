/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AuthInput from "../../components/AuthInput/AuthInput";
import { useEffect, useState } from "react";
import { signupRequest } from "../../apis/auth/authApis";
import { useNavigate } from "react-router-dom";

function Signup() {
  // 입력값 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({}); // 유효성 검사 에러 메시지 저장
  const navigate = useNavigate(); // 페이지 이동 함수

  // 회원가입 버튼 클릭 시 실행되는 함수
  const signupOnClickHandler = () => {
    // 모든 입력란이 비어있지 않은지 확인
    if (
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0 ||
      email.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 비밀번호와 확인 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 API 요청
    signupRequest({
      username: username,
      password: password,
      email: email,
    })
      .then((response) => {
        console.log(response.data);
        // 회원가입 성공
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/auth/signin"); // 로그인 페이지로 이동
        }
        // 회원가입 실패
        else if (response.data.status === "failed") {
          alert(response.data.message);
          return;
        }
      })
      .catch((error) => {
        alert("문제가 발생했습니다. 다시 시도해주세요."); // 예외 처리
        return;
      });
  };

  // 비밀번호 / 이메일 유효성 검사
  useEffect(() => {
    const newErrorMessage = {};

    // 비밀번호 정규식 검사 (8~16자, 영문자 + 숫자 + 특수문자 포함)
    if (password.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        newErrorMessage.password =
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
      }
    }

    // 이메일 정규식 검사 (올바른 이메일 형식인지 확인)
    if (email.length > 0) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        newErrorMessage.email = "이메일 형식에 맞게 입력해주세요.";
      }
    }

    // 새로운 에러 메시지 상태 업데이트
    setErrorMessage(newErrorMessage);
  }, [password, email]); // password 또는 email 값이 바뀔 때마다 실행됨

  return (
    <div css={s.container}>
      <h1>회원가입</h1>
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
          <AuthInput
            type={"password"}
            placeholder={"비밀번호 확인"}
            state={confirmPassword}
            setState={setConfirmPassword}
          />
          <AuthInput
            type={"email"}
            placeholder={"이메일"}
            state={email}
            setState={setEmail}
          />
        </div>
        <div css={s.errorBox}>
          {Object.keys(errorMessage).length !== 0 ? (
            <ul>
              <li>{errorMessage.password}</li>
              <li>{errorMessage.email}</li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div css={s.btnBox}>
          <button onClick={signupOnClickHandler}>가입하기</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
