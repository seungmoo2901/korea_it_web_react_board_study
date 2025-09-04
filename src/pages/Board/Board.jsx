/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { getBoardList } from "../../apis/board/boardApi";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function Board() {
  // 게시글 전체 목록을 저장하는 상태
  const [boardList, setBoardList] = useState([]);
  // 게시글이 없을 때 보여줄 메시지
  const [message, setMessage] = useState("");
  // 현재 페이지에 표시될 게시글 목록
  const [curruntBoardList, setCurruntBoardList] = useState([]);
  // 현재 선택된 페이지 번호
  const [curruntPage, setCurruntPage] = useState(0);

  // 페이지 이동을 위한 React Router 훅
  const navigate = useNavigate();

  // 한 페이지에 보여줄 게시글 개수
  const amountBoard = 15;

  // 컴포넌트 처음 렌더링 시 서버에서 게시글 목록 가져오기
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

  // 현재 페이지에 맞는 게시글 잘라서(curruntPage 기준) curruntBoardList에 저장
  useEffect(() => {
    const offset = curruntPage * amountBoard;
    const sliceBoard = boardList.slice(offset, offset + amountBoard);
    setCurruntBoardList(sliceBoard);
  }, [curruntPage, boardList]);

  // 페이지네이션 클릭 시 현재 페이지 변경
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
                <li
                  key={board.boardId}
                  onClick={() => {
                    navigate(`/board/${board.boardId}`);
                  }}
                >
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
