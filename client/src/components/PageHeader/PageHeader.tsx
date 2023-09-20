import { Header, HeaderName } from "@carbon/react";
import { useContext } from "react";
import { type GlobalContextValue, GlobalCtx } from "../../context/GlobalCtx";
function PageHeader() {
  const { pageErrorMsg } = useContext(GlobalCtx) as GlobalContextValue;
  return (
    <Header className="page-header" aria-label="Page header">
      {pageErrorMsg && <p className="error-msg">{pageErrorMsg}</p>}
      <HeaderName className="page-heading" as="h1" prefix="">
        Cryptocurrencies prices over time
      </HeaderName>
    </Header>
  );
}
export default PageHeader;
