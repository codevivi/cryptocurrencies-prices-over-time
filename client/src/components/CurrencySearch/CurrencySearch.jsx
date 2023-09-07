import { Form, RadioButtonGroup, RadioButton, Loading, Button, Slider } from "@carbon/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalCtx } from "../../context/GlobalCtx";
import { v4 as uuid } from "uuid";
import { PriceDataCtx } from "../../context/PriceDataCtx";
import ExpandableSearchInput from "./ExpandableSearchInput/ExpandableSearchInput";

function CurrencySearch() {
  const { timeframes } = useContext(GlobalCtx);
  const [selectedValue, setSelectedValue] = useState("");
  const [timeFramesValue, setTimeframesValue] = useState("");
  const [limit, setLimit] = useState(500);
  const [invalidLimit, setInvalidLimit] = useState(false);
  const { defineReqParamsForPriceData } = useContext(PriceDataCtx);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (timeframes === null) {
      return;
    }
    setTimeframesValue(timeframes[timeframes.length - 1].value);
  }, [timeframes]);

  const setSelectedValueCallback = useCallback((code) => {
    setSelectedValue(code);
  }, []);

  const handleSliderChange = (val) => {
    let value = Number(val.value);
    if (!value || value < 1 || value > 1000 || typeof value !== "number") {
      setInvalidLimit(true);
    } else {
      setInvalidLimit(false);
    }
    setLimit(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidLimit) {
      return;
    }
    if (!timeFramesValue) {
      return;
    }
    if (selectedValue) {
      let currency = selectedValue;
      defineReqParamsForPriceData(currency, timeFramesValue, limit);
      return;
    }
    setSubmitError("Please select cryptocurrency or fill in search field");
  };

  const handleRadioClick = (e) => {
    setTimeframesValue(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} action="#" className="currency-search">
      <ExpandableSearchInput setSelectedValueCallback={setSelectedValueCallback} />
      <RadioButtonGroup className="radio-group" legendText="Select time frame" disabled={timeframes === null ? true : false} valueSelected={timeFramesValue} name="timeframe">
        {timeframes !== null ? timeframes.map((tf, i) => <RadioButton key={uuid()} labelText={tf.text} onClick={handleRadioClick} value={tf.value} id={`radio-${i + 1}`}></RadioButton>) : <Loading small={true} withOverlay={false} />}
      </RadioButtonGroup>
      <Slider className="slider" required onChange={handleSliderChange} invalidText="Must be a number, in range 1-1000" invalid={limit >= 1 && limit <= 1000 ? false : true} labelText={'Choose limit ("maximum amount of results")'} value={limit} min={1} max={1000} />
      <div>
        <Button type="submit">Get price data</Button>
        {submitError && <p className="error-msg">{submitError}</p>}
      </div>
    </Form>
  );
}
export default CurrencySearch;
