/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { getBoardList } from "../../apis/board/boardApi";
import { useNavigate } from "react-router-dom";

function MyBoard({ userId }) {
  // 사용자 게시물 목록 상태
  const [boardList, setBoardList] = useState([]);
  // 에러 또는 안내 메시지 상태
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 컴포넌트 로드 시 게시물 불러오기
  useEffect(() => {
    getBoardList().then((response) => {
      if (response.data.status === "success") {
        // 로그인한 사용자(userId)의 게시물만 필터링
        setBoardList(
          response.data.data.filter((board) => board.userId === userId)
        );
      } else if (response.data.status === "failed") {
        setBoardList([]);
        setMessage(response.data.message);
      }
    });
  }, [userId]);
  
  return (
    <div css={s.container}>
      <ul>
        {boardList.map((board, index) => {
          const data = board.createDt;
          const formattedData = data.split("T")[0];
          return (
            <li
              key={board.boardId}
              onClick={() => navigate(`/board/${board.boardId}`)}
            >
              <div>
                <span>{index + 1}</span>
                <strong>{board.title}</strong>
              </div>
              <span>{formattedData}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyBoard;
