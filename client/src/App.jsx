import { Content } from "@carbon/react";
import PageHeader from "./components/PageHeader/PageHeader.jsx";
import PriceDataForm from "./components/PriceDataForm/PriceDataForm.jsx";
import Info from "./components/Info/Info.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { GlobalProvider } from "./context/GlobalCtx.jsx";
import Chart from "./components/Chart/Chart.jsx";
import { PriceDataProvider } from "./context/PriceDataCtx.jsx";
function App() {
  return (
    <GlobalProvider>
      <PageHeader />
      <Content className="page-main">
        <Info />
        <PriceDataProvider>
          <PriceDataForm />
          <Chart />
        </PriceDataProvider>
      </Content>
      <Footer />
    </GlobalProvider>
  );
}

export default App;
