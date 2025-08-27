/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { getBoardList } from "../../apis/board/boardApi";
import ReactPaginate from "react-paginate";

function Board() {
  // 게시글 목록을 저장할 상태 변수 (초기값은 빈 배열)
  const [boardList, setBoardList] = useState([]);
  const [message, setMessage] = useState("");
  const [curruntBoardList, setCurruntBoardList] = useState([]);
  const [curruntPage, setCurruntPage] = useState(0);

  const amountBoard = 15; //한 페이지에 보여줄 게시물 갯수

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 부분
    getBoardList().then((response) => {
      if (response.data.status === "success") {
        setBoardList(response.data.data);
      } else if (response.data.status === "failed") {
        setBoardList([]);
        setMessage(response.data.message);
      }
    });
  }, []);

  useEffect(() => {
    const offset = curruntPage * amountBoard;
    const sliceBoard = boardList.slice(offset, offset + amountBoard);
    setCurruntBoardList(sliceBoard);
  }, [curruntPage, boardList]);

  const pageOnchangeHandler = (event) => {
    setCurruntPage(event.selected);
  };

  return (
    <div css={s.container}>
      <div css={s.listContainer}>
        {boardList.length === 0 ? (
          <p>{message}</p>
        ) : (
          <ul>
            {curruntBoardList.map((board, index) => {
              const date = board.createDt;
              const formattedDate = date.split("T")[0];
              const boardNumber = curruntPage * amountBoard + index + 1;
              return (
                <li key={board.boardId}>
                  <div>
                    <span>{boardNumber}</span>
                    <strong>{board.title}</strong>
                  </div>
                  <span>{formattedDate}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div css={s.pagenateContainer}>
        <ReactPaginate
          pageCount={Math.ceil(boardList.length / amountBoard)}
          onPageChange={pageOnchangeHandler}
          previousLabel="이전"
          nextLabel="다음"
        />
      </div>
    </div>
  );
}

export default Board;

//페이지네이션은 백엔드에서 계산해서 넣을 수있는 api사용
