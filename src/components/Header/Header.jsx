/** @jsxImportSource @emotion/react */
import { LuLogIn, LuLogOut, LuUserRoundPlus } from "react-icons/lu";
import * as s from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { IoMdPerson } from "react-icons/io";

function Header() {
  const navigate = useNavigate();
  // 페이지 이동 함수
  const queryClient = useQueryClient();
  // React Query의 클라이언트 객체
  const principalData = queryClient.getQueryData(["getPrincipal"]);
  // "getPrincipal" 키로 캐싱된 사용자 정보 가져오기 (로그인 여부 확인용)

  // 네비게이션 버튼 클릭 시 해당 경로로 이동
  const onClickNavHandler = (path) => {
    navigate(path);
  };

  // 로그아웃 처리
  const onClickLogout = () => {
    localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
    window.location.href = "/auth/signin"; // 로그인 페이지로 강제 이동
  };

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
        {principalData ? (
          <ul>
            <li
              css={s.headerIcon}
              onClick={() =>
                onClickNavHandler(
                  `/account/profile/${principalData.data.data.username}`
                )
              }
            >
              <IoMdPerson />
            </li>
            <li css={s.headerIcon} onClick={onClickLogout}>
              <LuLogOut />
            </li>
          </ul>
        ) : (
          <ul>
            <li
              css={s.headerIcon}
              onClick={() => onClickNavHandler("/auth/signin")}
            >
              <LuLogIn />
            </li>
            <li
              css={s.headerIcon}
              onClick={() => onClickNavHandler("/auth/signup")}
            >
              <LuUserRoundPlus />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
