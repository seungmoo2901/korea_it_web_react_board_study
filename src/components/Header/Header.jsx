/**@jsxImportSource @emotion/react */
import { LuLogIn, LuUserRoundPlus } from "react-icons/lu";
import * as s from "./styles";
function Header() {
  return (
    <div css={s.header}>
      <div>BOARD</div>
      <div>
        <ul>
          <li>게시판</li>
          <li>글쓰기</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <LuLogIn/>

          </li>
          <li>
            <LuUserRoundPlus />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
