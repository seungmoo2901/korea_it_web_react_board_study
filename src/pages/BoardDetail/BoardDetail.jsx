/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";

import { getBoardDetail, removeBoard } from "../../apis/board/boardApi";
import { usePrincipalState } from "../../store/usePrincipalStore";

function BoardDetail() {
  // 게시글 상세 데이터를 저장할 상태
  const [boardData, setBoardData] = useState({});

  // URL 경로에서 게시글 ID 가져오기
  const { boardId } = useParams();

  // 페이지 이동을 위한 hook
  const navigate = useNavigate();

  // 로그인 여부와 사용자 정보 가져오기 (전역 상태)
  const { isLoggedIn, principal } = usePrincipalState();

  // 게시글 삭제 버튼 클릭 시 실행되는 함수
  const removeOnClickHandler = (boardId) => {
    removeBoard(boardId).then((response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        navigate("/board");
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        return;
      }
    });
  };

  // 컴포넌트가 처음 렌더링되거나 boardId가 바뀔 때 게시글 상세 조회
  useEffect(() => {
    getBoardDetail(boardId).then((response) => {
      if (response.data.status === "success") {
        setBoardData(response.data.data);
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        navigate("/board");
      }
    });
  }, [boardId, navigate]);

  return (
    <div css={s.container}>
      <div css={s.boardContainer}>
        <div css={s.boardHeader}>
          <h3>{boardData.title}</h3>
          <span>{boardData?.createDt?.split("T")[0]}</span>
        </div>
        <div css={s.boardContent}>{boardData.content}</div>
      </div>
      <div css={s.btnContainer}>
        <button
          css={s.btn("#6c757d")}
          onClick={() => {
            navigate(-1);
          }}
        >
          목록
        </button>
        {principal.userId === boardData.userId ? (
          <div>
            <button
              css={s.btn("#dc3545")}
              onClick={() => removeOnClickHandler(boardData.boardId)}
            >
              삭제
            </button>
            <button
              css={s.btn("#0d6efd")}
              onClick={() => navigate(`/board/update/${boardId}`)}
            >
              수정
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BoardDetail;
