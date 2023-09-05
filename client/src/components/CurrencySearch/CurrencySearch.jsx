import { Select, SelectItem, Search, Form, RadioButtonGroup, RadioButton, Loading, Button } from "@carbon/react";
import { useContext, useEffect, useState } from "react";
import { GlobalCtx } from "../../context/GlobalCtx";
import { v4 as uuid } from "uuid";
import { PriceDataCtx } from "../../context/PriceDataCtx";
function CurrencySearch() {
  const { cryptoCurrencies, timeframes } = useContext(GlobalCtx);

  const [searchValue, setSearchValue] = useState("");
  const [searchErrorMsg, setSearchErrorMsg] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [timeFramesValue, setTimeframesValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const { defineReqParamsForPriceData } = useContext(PriceDataCtx);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (timeframes === null) {
      return;
    }
    setTimeframesValue(timeframes[0].value);
  }, [timeframes]);

  const handleSearchChange = (e) => {
    let val = e.target.value;
    if (val.length > 30) {
      setSearchErrorMsg("Input restricted to max 30 characters");
    } else {
      setSearchErrorMsg("");
    }
    if (submitError) {
      setSubmitError("");
    }
    setSearchValue(e.target.value);
    setSearchType("search");
    setSelectedValue("");
  };
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    setSearchType("select");
    setSearchValue("");
    setSearchErrorMsg("");
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchErrorMsg || !timeFramesValue) {
      return;
    }
    if (selectedValue || searchValue) {
      let currency = selectedValue || searchValue;
      defineReqParamsForPriceData(currency, timeFramesValue, searchType);
      return;
    }
    setSubmitError("Please select cryptocurrency or fill in search field");
  };
  const handleRadioClick = (e) => {
    setTimeframesValue(e.target.value);
  };
  return (
    <Form onSubmit={handleSubmit} action="#" className="currency-search">
      <div className="flex-wrap">
        <div className="flex-item">
          <p className="error-msg">{searchErrorMsg}</p>
          <p className="cds--label" aria-hidden={true}>
            Search
          </p>
          <Search className="search" placeholder="For cryptocurrency by name or code" value={searchValue} onChange={handleSearchChange} labelText="Search" />
        </div>
        <Select className="flex-item select" id="select-1" warn={cryptoCurrencies === null ? true : false} warnText={"Loading..."} onChange={handleSelectChange} value={selectedValue} disabled={cryptoCurrencies === null ? true : false} labelText="Or Select cryptocurrency" hideLabel={false}>
          <SelectItem value="" text="" />
          {/* {cryptoCurrencies && cryptoCurrencies.map((curr) => <SelectItem key={uuid()} value={curr.code} selected={curr.code === selectedValue ? true : false} text={curr.displayName} />)} */}
          {cryptoCurrencies && cryptoCurrencies.map((curr) => <SelectItem key={uuid()} value={curr.code} text={curr.displayName} />)}
        </Select>
      </div>
      <RadioButtonGroup className="radio-group" legendText="Select time frame" disabled={timeframes === null ? true : false} valueSelected={timeFramesValue} name="timeframe">
        {timeframes !== null ? timeframes.map((tf, i) => <RadioButton key={uuid()} labelText={tf.text} onClick={handleRadioClick} value={tf.value} id={`radio-${i + 1}`}></RadioButton>) : <Loading small={true} withOverlay={false} />}
      </RadioButtonGroup>
      <div>
        <Button type="submit">Get price data</Button>
        {submitError && <p className="error-msg">{submitError}</p>}
      </div>
    </Form>
  );
}
export default CurrencySearch;
