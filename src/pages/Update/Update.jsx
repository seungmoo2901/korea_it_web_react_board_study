/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoardDetail, updateBoardRequest } from "../../apis/board/boardApi";

function Update() {
  // 게시글 수정에 필요한 데이터 상태 (제목, 내용)
  const [boardData, setBoardData] = useState({ title: "", content: "" });

  // URL 경로에서 게시글 ID 추출
  const { boardId } = useParams();

  // 페이지 이동을 위한 hook
  const navigate = useNavigate();

  // 로그인 상태와 사용자 정보 가져오기
  const { isLoggedIn, principal } = usePrincipalState();

  // 게시글 수정 요청 처리
  const updateBoardMutation = useMutation({
    mutationKey: "updateBoard",
    mutationFn: updateBoardRequest,
    onSuccess: (response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        navigate("/board");
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        return;
      }
    },
    onError: (error) => {
      alert("문자가 발생했습니다. 다시 시도해주세요.");
      return;
    },
  });
  // 수정 버튼 클릭 시 실행
  const updateOnClickHandler = () => {
    if (
      boardData.title.trim().length === 0 ||
      boardData.content.trim().length === 0
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    updateBoardMutation.mutate({
      title: boardData.title,
      content: boardData.content,
      boardId: boardId,
    });
  };

  // 컴포넌트가 렌더링될 때 해당 게시글 상세 데이터 불러오기
  useEffect(() => {
    getBoardDetail(boardId).then((response) => {
      if (response.data.status === "success") {
        if (principal.userId !== response.data.data.userId) {
          alert("잘못된 접근입니다.");
          navigate("/board");
        }
        // 게시글 데이터 상태에 저장
        setBoardData(response.data.data);
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        navigate("/board");
      }
    });
  }, [boardId, principal, navigate]);

  return (
    <div css={s.container}>
      <input
        type="text"
        value={boardData.title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => {
          setBoardData({ ...boardData, title: e.target.value });
        }}
      />
      <textarea
        name=""
        id=""
        placeholder="내용을 입력해주세요."
        value={boardData.content}
        onChange={(e) => {
          setBoardData({
            ...boardData,
            content: e.target.value,
          });
        }}
      ></textarea>
      <div css={s.btnBox}>
        <button onClick={updateOnClickHandler}>수정하기</button>
      </div>
    </div>
  );
}

export default Update;
