/**@jsxImportSource @emotion/react */
import Header from "../Header/Header";
import * as s from "./styles";
function Layout({ childern }) {
  return (
    <div css={s.layout}>
      <Header />
      {childern}
    </div>
  );
}

export default Layout;
