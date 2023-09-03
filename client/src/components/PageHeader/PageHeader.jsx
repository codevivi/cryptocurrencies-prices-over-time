import { Header, HeaderName } from "@carbon/react";
import { useContext } from "react";
import { GlobalCtx } from "../../context/GlobalCtx";
function PageHeader() {
  const { errorMsg } = useContext(GlobalCtx);
  return (
    <Header className="page-header" aria-label="Page header">
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <HeaderName as="h1" prefix="">
        Cryptocurrencies prices over time
      </HeaderName>
    </Header>
  );
}
export default PageHeader;
