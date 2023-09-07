// import { Theme, Content } from "@carbon/react";
import { Content } from "@carbon/react";
import PageHeader from "./components/PageHeader/PageHeader.jsx";
import CurrencySearch from "./components/CurrencySearch/CurrencySearch.jsx";
import Info from "./components/Info/Info.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { GlobalProvider } from "./context/GlobalCtx.jsx";
import Chart from "./components/Chart/Chart.jsx";
import { PriceDataProvider } from "./context/PriceDataCtx.jsx";
function App() {
  return (
    // <Theme theme="g100">
    <GlobalProvider>
      <PageHeader />
      <Content className="page-main">
        <Info />
        <PriceDataProvider>
          <CurrencySearch />
          <Chart />
        </PriceDataProvider>
      </Content>
      <Footer />
    </GlobalProvider>
    // </Theme>
  );
}

export default App;
