import { Theme, Content } from "@carbon/react";
import PageHeader from "./components/PageHeader/PageHeader.jsx";
import CurrencySearch from "./components/CurrencySearch/CurrencySearch.jsx";
import { GlobalProvider } from "./context/GlobalCtx.jsx";
function App() {
  return (
    <Theme theme="g90">
      <GlobalProvider>
        <PageHeader />
        <Content className="page-main">
          <CurrencySearch />
        </Content>
      </GlobalProvider>
    </Theme>
  );
}

export default App;
