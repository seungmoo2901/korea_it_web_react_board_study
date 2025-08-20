/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function Siginin() {
  return (
    <div css={s.container}>
      <h1>로그인</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
        </div>
      </div>
    </div>
  );
}

export default Siginin;
