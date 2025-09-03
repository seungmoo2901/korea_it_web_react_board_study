import { css } from "styled-components";

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const profileImgBox = css`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
  }

  & > input {
    display: none;
  }
`;

export const buttonBox = css`
  & > button {
    border: none;
    border-radius: 8px;
    padding: 8px 18px;
    font-size: 14px;
    color: white;
    background-color: #0d6efd;
  }

  &:hover {
    opacity: 0.8;
  }
`;
