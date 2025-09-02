/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { getBoardList } from "../../apis/board/boardApi";
import { useNavigate } from "react-router-dom";

function MyBoard({ userId }) {
  const [boardList, setBoardList] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBoardList().then((response) => {
      if (response.data.status === "success") {
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
