/** @jsxImportSource @emotion/react */
import AuthInput from "../AuthInput/AuthInput";
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useMutation } from "@tanstack/react-query";
import { changePasswordRequest } from "../../apis/account/accountApis";
import { useNavigate } from "react-router-dom";
import { usePrincipalState } from "../../store/usePrincipalStore";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, principal, logout } = usePrincipalState();
  const navigate = useNavigate();

  const changePasswordMutation = useMutation({
    mutationKey: "changePassword",
    mutationFn: changePasswordRequest,
    onSuccess: (response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        logout();
        navigate("/auth/signin");
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        setPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        return;
      }
    },
  });

  const onClickChangeHandler = () => {
    if (
      password.trim().length === 0 ||
      newPassword.trim().length === 0 ||
      newPasswordConfirm.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }
    if (errorMessage !== "") {
      alert(
        "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
      );
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    changePasswordMutation.mutate({
      userId: principal.userId,
      oldPassword: password,
      newPassword: newPassword,
    });
  };

  useEffect(() => {
    setErrorMessage("");
    if (newPassword.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage(
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
        );
      }
    }
  }, [newPassword]);

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
        <ul>{errorMessage !== "" ? <li>{errorMessage}</li> : <></>}</ul>
        <button onClick={onClickChangeHandler}>변경하기</button>
      </div>
    </div>
  );
}

export default ChangePassword;
