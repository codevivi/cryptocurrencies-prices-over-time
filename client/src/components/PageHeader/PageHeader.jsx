import { Header, HeaderName } from "@carbon/react";
function PageHeader() {
  return (
    <Header className="page-header" aria-label="Page header">
      <HeaderName as="h1" prefix="">
        Cryptocurrencies prices over time
      </HeaderName>
    </Header>
  );
}
export default PageHeader;
