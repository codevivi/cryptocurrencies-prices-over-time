import { Theme, Content } from "@carbon/react";
import PageHeader from "./components/PageHeader/PageHeader.jsx";
import CurrencySearch from "./components/CurrencySearch/CurrencySearch.jsx";
import { GlobalProvider } from "./context/GlobalCtx.jsx";
import Chart from "./components/Chart/Chart.jsx";
import { PriceDataProvider } from "./context/PriceDataCtx.jsx";
function App() {
  return (
    <Theme theme="g90">
      <GlobalProvider>
        <PageHeader />
        <Content className="page-main ">
          <PriceDataProvider>
            <CurrencySearch />
            <Chart />
          </PriceDataProvider>
        </Content>
      </GlobalProvider>
    </Theme>
  );
}

export default App;
