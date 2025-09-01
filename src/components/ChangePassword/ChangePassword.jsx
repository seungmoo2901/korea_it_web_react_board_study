/** @jsxImportSource @emotion/react */
import AuthInput from "../AuthInput/AuthInput";
import { useState } from "react";
import * as s from "./styles";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  return (
    <div css={s.container}>
      <div css={s.inputBox}>
        
        <AuthInput
          type={"password"}
          placeholder={"현재 비밀번호"}
          state={password}
          setState={setPassword}
        />
        <AuthInput
          type={"password"}
          placeholder={"새 비밀번호"}
          state={newPassword}
          setState={setNewPassword}
        />
        <AuthInput
          type={"password"}
          placeholder={"새 비밀번호 확인"}
          state={newPasswordConfirm}
          setState={setNewPasswordConfirm}
        />
        <button>변경하기</button>
      </div>
    </div>
  );
}

export default ChangePassword;
