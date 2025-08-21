/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AuthInput({ type, placeholder, state, setState }) {
  const onChangeHandler = (e) => {
    setState(e.target.value);
  };

  return (
    <>
      <input
        css={s.input}
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default AuthInput;
