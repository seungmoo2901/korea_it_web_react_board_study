/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import AuthInput from "../../components/AuthInput/AuthInput";
import * as s from "./styles";
import { signupRequest } from "../../apis/auth/authApis";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const signupOnClickHandler = () => {
    if (
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0 ||
      email.trim().length === 0
    ) {
      alert("모든항목 입력해 주세요");
      return;
    }

    // 회원가입 요청 API
    signupRequest({
      username: username,
      password: password,
      email: email,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/auth/signin");
        } else if (response.data.status === "failed") {
          alert(response.data.message);
          return;
        }
      })
      .catch((error) => {
        alert("문제가 발생했습니다. 다시 시도해 주세요.");
        return;
      });
  };

  useEffect(() => {
    const newErrorMessage = {};

    if (password.length > 0) {
      const passwordRegx =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegx.test(password)) {
        newErrorMessage.password =
          "비밀번호는 최소 8자에서 16자까지 영문자 숫자 및 특수문자를 포함해야 한다";
      }
    }

    if (email.length > 0) {
      const regEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!regEmail.test(email)) {
        newErrorMessage.email = "이메일 형식에 맞게 해주세요.";
      }
    }

    setErrorMessage(newErrorMessage);
  }, [password, email]); // password, email 변경 시 실행

  return (
    <div css={s.container}>
      <h1>회원가입</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type="text"
            placeholder="아이디"
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호"
            state={password}
            setState={setPassword}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호 확인"
            state={confirmPassword}
            setState={setConfirmPassword}
          />
          <AuthInput
            type="email"
            placeholder="이메일"
            state={email}
            setState={setEmail}
          />
        </div>
        <div css={s.errorBox}>
          {Object.keys(errorMessage).length !== 0 && (
            <ul>
              <li>{errorMessage.password}</li>
              <li>{errorMessage.email}</li>
            </ul>
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
