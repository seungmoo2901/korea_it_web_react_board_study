/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";
import {
  DeleteBoard,
  getBoardDetail,
  removeBoard,
} from "../../apis/board/boardApi";
import { useQueryClient } from "@tanstack/react-query";

function BoardDetail() {
  const [boardData, setBoardData] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);

  //삭제버튼 누르면 삭제요청 보내고 성공시 리스트로 보내기
  const removeOnClickHandler = async () => {
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
            navigate("/board");
          }}
        >
          목록
        </button>
        {principalData.data.data.userId === boardData.userId ? (
          <div>
            <button
              css={s.btn("#dc3545")}
              onClick={() => {
                removeOnClickHandler(boardId);
              }}
            >
              삭제
            </button>
            <button css={s.btn("#0d6efd")}>수정</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BoardDetail;
