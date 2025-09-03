/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import profileImg from "../../assets/꼬부기.jpeg";
import MyBoard from "../../components/MyBoard/MyBoard";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePrincipalState } from "../../store/usePrincipalStore";
import { sendmailRequest } from "../../apis/account/accountApis";
import ChangeProfileImg from "../../components/ChangeProfileImg/ChangeProfileImg";

function Profile() {
  const [tab, setTab] = useState("myboard");
  const [tabChild, setTabChild] = useState(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, principal } = usePrincipalState();

  const tabClickHandler = (path) => {
    setTabChild(path === "myboard" ? 1 : path === "changepassword" ? 2 : 3);
    navigate(`${pathname}?tab=${path}`);
  };

  const onClickVerifyHandler = () => {
    sendmailRequest({
      email: principal.email,
    }).then((response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
      } else if (response.data.status === "failed") {
        alert(response.data.message);
      }
    });
  };

  useEffect(() => {
    setTab(searchParams.get("tab"));
    setTabChild(
      searchParams.get("tab") === "myboard" || searchParams.get("tab") === null
        ? 1
        : searchParams.get("tab") === "changepassword"
        ? 2
        : 3
    );
  }, [pathname, searchParams]);

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={principal?.profileImg} alt="profileImage" />
            </div>
          </div>
          <div css={s.profileInfoBox}>
            <h3>{principal?.username}</h3>
            <div>
              <p>{principal?.email}</p>
              {principal?.authorities[0].authority === "ROLE_TEMPORARY" ? (
                <button onClick={onClickVerifyHandler}>인증하기</button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div css={s.profileBox}>
          <div css={s.profileTab(tabChild)}>
            <ul>
              <li onClick={() => tabClickHandler("myboard")}>내 게시물</li>
              <li onClick={() => tabClickHandler("changepassword")}>
                비밀번호 변경
              </li>
              <li onClick={() => tabClickHandler("changeprofileimg")}>
                프로필 이미지 변경
              </li>
            </ul>
          </div>
          <div css={s.profileMain}>
            {tab === "myboard" || tab === null ? (
              <MyBoard userId={principal?.userId} />
            ) : tab === "changepassword" ? (
              <ChangePassword />
            ) : (
              <ChangeProfileImg oldprofileImg={principal.profileImg} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
