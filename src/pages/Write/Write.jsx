/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addBoardRequest } from "../../apis/board/boardApi";
function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);
  const navigate = useNavigate();

  const addBoardMutation = useMutation({
    mutationKey: "addBoard",
    mutationFn: addBoardRequest,
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
      alert("문제가 발생했습니다. 다시 시도해주세요");
      return;
    },
  });

  const addOnClickHandler = () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    if (principalData === undefined) {
      alert("로그인이 필요합니다.");
      navigate("/auth/signin");
      return;
    }
    addBoardMutation.mutate({
      title: title,
      content: content,
      userId: principalData.data.data.userId,
    });
  };

  return (
    <div css={s.container}>
      <input
        type="text"
        value={title}
        placeholder="제목을 입력해 주세요."
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        name=""
        id=""
        placeholder="내용을 입력해 주세요."
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div css={s.btnBox}>
        <button onClick={addOnClickHandler}>게시하기</button>
      </div>
    </div>
  );
}

export default Write;
