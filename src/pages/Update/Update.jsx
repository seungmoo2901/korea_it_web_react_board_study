/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoardDetail, updateBoardRequest } from "../../apis/board/boardApi";

function Update() {
  const [boardData, setBoardData] = useState({ title: "", content: "" });
  const { boardId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);

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

  useEffect(() => {
    getBoardDetail(boardId).then((response) => {
      if (response.data.status === "success") {
        if (principalData.data.data.userId !== response.data.data.userId) {
          alert("잘못된 접근입니다.");
          navigate("/board");
        }
        setBoardData(response.data.data);
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        navigate("/board");
      }
    });
  }, [boardId, principalData, navigate]);

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
