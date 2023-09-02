import { Theme, Content } from "@carbon/react";
import PageHeader from "./components/PageHeader/PageHeader.jsx";
import CurrencySearch from "./components/CurrencySearch/CurrencySearch.jsx";
function App() {
  return (
    <Theme theme="g90">
      <PageHeader />
      <Content className="page-main">
        <CurrencySearch />
      </Content>
    </Theme>
  );
}

export default App;
