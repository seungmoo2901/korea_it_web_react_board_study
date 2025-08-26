/** @jsxImportSource @emotion/react */
import { useState } from "react";
import AuthInput from "../../components/AuthInput/AuthInput";
import * as s from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oauth2MergeRequest } from "../../apis/auth/authApis";

function OAuth2Merge() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const mergeOnClickHandler = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    } else {
      // 연동 API요청 보내기
      oauth2MergeRequest({
        username: username,
        password: password,
        provider: searchParam.get("provider"),
        providerUserId: searchParam.get("providerUserId"),
      }).then((response) => {
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/auth/signin");
        } else if (response.data.status === "failed") {
          alert(response.data.message);
          return;
        }
      });
    }
  };

  return (
    <div css={s.container}>
      <h1>연동하기</h1>
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
        <div css={s.btnBox}>
          <button onClick={mergeOnClickHandler}>연동하기</button>
        </div>
      </div>
    </div>
  );
}

export default OAuth2Merge;
