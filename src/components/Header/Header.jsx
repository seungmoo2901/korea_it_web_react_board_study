/** @jsxImportSource @emotion/react */
import { LuLogIn, LuUserRoundPlus } from "react-icons/lu";
import * as s from "./styles";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  
  const onClickNavHandler = (path)=>{
      navigate(path)
    }
  return (
    <div css={s.header}>
      <div onClick={() => onClickNavHandler("/")}>BOARD</div>
      <div>
        <ul>
          <li>
            <Link to={"/board"}>게시판</Link>
          </li>
          <li>
            <Link to={"/write"}>글쓰기</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li
            css={s.headerIcon}
            onClick={() => onClickNavHandler("/auth/signin")} // 로그인 페이지 이동
          >
            <LuLogIn />
          </li>
          <li
            css={s.headerIcon}
            onClick={() => onClickNavHandler("/auth/signup")} // 회원가입 페이지 이동
          >
            <LuUserRoundPlus />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
