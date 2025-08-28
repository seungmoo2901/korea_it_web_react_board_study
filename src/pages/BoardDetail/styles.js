import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 200px;
  box-sizing: border-box;
`;

export const boardContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const boardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  box-sizing: border-box;
  padding: 15px 10px;

  & > h3 {
    margin: 0;
  }
`;

export const boardContent = css`
  width: 100%;
  min-height: 600px;
  padding: 10px;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  box-sizing: border-box;
`;

export const btnContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  & > div {
    display: flex;
    gap: 8px;
  }
`;

export const btn = (color) => css`
  border: none;
  padding: 8px 14px;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  background-color: ${color};
  color: white;

  &:hover {
    opacity: 0.85;
  }
`;
