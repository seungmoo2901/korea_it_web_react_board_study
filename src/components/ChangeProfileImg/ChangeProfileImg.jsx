/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { storage } from "../../apis/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { v4 as uuid } from "uuid";
import { changeProfileImg } from "../../apis/account/accountApis";

function ChangeProfileImg({ oldprofileImg, userId }) {
  // 현재 프로필 이미지
  const [profileImg, setProfileImg] = useState(null);
  // 새로 선택한 이미지 파일
  const [newProfileImg, setNewProfileImg] = useState(null);
  // 업로드 중 상태
  const [isUploading, setIsUploading] = useState(false);
  // 업로드 진행률
  const [progress, setProgerss] = useState(0);
  // 숨겨진 파일 입력 참조
  const fileInputRef = useRef(null);

  //파일선택 이벤트 발생시 실행
  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewProfileImg(file);

      const reader = new FileReader();
      //파일 읽기가 완료되면 호출될 콜백함수 정의
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };

      //선택된 파일을 URL 형식으로 읽어옴
      reader.readAsDataURL(file);
    }
  };

  // 프로필 이미지를 클릭하면 파일 선택창 열기
  const onClickProfileImgHandler = () => {
    fileInputRef.current.click();
  };

  // "변경하기" 버튼 클릭 시 실행
  const onClickChangeBtnHandler = () => {
    if (!newProfileImg) {
      alert("이미지를 선택하세요");
      return;
    }
    //업로드 시작
    setIsUploading(true);

    // Firebase Storage 경로 + 랜덤 파일명 생성
    const imageRef = ref(
      storage,
      `profile-img/${uuid()}_${newProfileImg.name.split(".").pop()}`
    );
    const uploadTask = uploadBytesResumable(imageRef, newProfileImg);
    //업로드 상태 변화를 감지하는 이벤트 리스너 등록
    uploadTask.on(
      "state_changed",
      //진행상태 리스너:업로드 진행률을 계산할 수 있게 해줌
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgerss(progressPercent);
      },
      //에러 핸들러
      (error) => {
        console.log(error);
        alert("업로드 중 에러가 발생했습니다.");
        setIsUploading(false);
      },
      //완료 핸들러
      async () => {
        try {
          // 업로드된 파일의 다운로드 URL 가져오기
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // 서버에 프로필 이미지 변경 요청
          changeProfileImg({
            userId: userId,
            profileImg: downloadUrl,
          }).then((response) => {
            if (response.data.status === "success") {
              alert(response.data.message);
              window.location.reload();
            } else if (response.data.status === "failed") {
              alert(response.data.message);
            }
          });
        } catch (error) {
          console.log(error);
          alert("이미지 URL을 가져오는 중에 에러가 발생했습니다.");
          setIsUploading(false);
          setProgerss(0);
        }
      }
    );
  };

  // 기존 프로필 이미지를 초기값으로 설정
  useEffect(() => {
    setProfileImg(oldprofileImg);
  }, [oldprofileImg]);
  return (
    <div css={s.container}>
      <div css={s.profileImgBox}>
        <img
          src={profileImg}
          alt="profileImage"
          onClick={onClickProfileImgHandler}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onChangeFileHandler}
        />
      </div>
      <div css={s.buttonBox}>
        <button onClick={onClickChangeBtnHandler}>
          {isUploading ? `${progress}%` : "변경하기"}
        </button>
      </div>
    </div>
  );
}

export default ChangeProfileImg;
