import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 0;
  box-sizing: border-box;
`;

export const box = css`
  width: 400px;
  height: 450px;
  border: 1px solid #dbdbdb;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export const inputBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > input {
    outline: none;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    padding: 10px 15px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
  }
`;
