import { Form, RadioButtonGroup, RadioButton, Loading, Button, Slider } from '@carbon/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { type GlobalContextValue, GlobalCtx } from '../../context/GlobalCtx';
import { v4 as uuid } from 'uuid';
import { type PriceDataContextValue, PriceDataCtx } from '../../context/PriceDataCtx';
import { type SyntheticEvent } from 'react';
import DropdownSearch from './DropdownSearch/DropdownSearch';
import { ActionToLogDescription, useLogUserAction } from '../../hooks/useLogUserAction';
export type SetSelectedValueCallback = (code: string | null) => void;
export type ClearSubmitError = () => void;
export type SelectedValue = string;
export type SetSearchToLogOnSubmitCallback = (str: string) => void;

function PriceDataForm() {
  const { timeframes, cryptoCurrencies } = useContext(GlobalCtx) as GlobalContextValue;
  const { setReqQueryCallback, loadingPriceData } = useContext(
    PriceDataCtx
  ) as PriceDataContextValue;
  const [selectedValue, setSelectedValue] = useState<SelectedValue>('');
  const [timeFramesValue, setTimeframesValue] = useState('');
  const [limit, setLimit] = useState(500);
  const [invalidLimit, setInvalidLimit] = useState(false);
  const [searchToLogOnSubmit, setSearchToLogOnSubmit] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [dispatchActionToLog] = useLogUserAction();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (timeframes === null || timeframes === undefined || timeframes?.length === 0) {
      return;
    }
    setTimeframesValue(timeframes[timeframes.length - 1].value);
  }, [timeframes]);

  const setSearchToLogOnSubmitCallback: SetSearchToLogOnSubmitCallback = useCallback((str) => {
    setSearchToLogOnSubmit(str);
  }, []);

  const setSelectedValueCallback: SetSelectedValueCallback = useCallback((code) => {
    setSelectedValue(code || '');
  }, []);

  const clearSubmitError: ClearSubmitError = useCallback(() => {
    setSubmitError('');
  }, []);

  const handleSliderChange = useCallback(({ value }: { value: number }) => {
    clearTimeout(debounceTimeoutRef?.current);
    debounceTimeoutRef.current = setTimeout(() => {
      if (!Number.isFinite(value) || value < 1 || value > 1000) {
        setInvalidLimit(true);
      }
      setLimit(value);
    }, 500);
  }, []);
  const handleSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (invalidLimit) {
        return;
      }

      if (!timeFramesValue) {
        return;
      }

      if (selectedValue) {
        let currency = selectedValue;
        dispatchActionToLog({
          value: currency,
          description: ActionToLogDescription.SELECTED_CRYPTOCURRENCY,
        });
        setReqQueryCallback(currency, timeFramesValue, limit);
        return;
      }

      if (searchToLogOnSubmit) {
        dispatchActionToLog({
          value: searchToLogOnSubmit,
          description: ActionToLogDescription.SEARCHED_CRYPTOCURRENCY,
        });
      }
      setSubmitError('Select currency from dropdown search matches');
    },
    [limit, timeFramesValue, selectedValue]
  );

  const handleRadioClick = (e: SyntheticEvent<HTMLInputElement>) => {
    setTimeframesValue(e.currentTarget.value);
  };

  return (
    <Form onSubmit={handleSubmit} action="#" className="price-data-form">
      <DropdownSearch
        setSelectedValueCallback={setSelectedValueCallback}
        clearSubmitError={clearSubmitError}
        selectedValue={selectedValue}
        setSearchToLogOnSubmitCallback={setSearchToLogOnSubmitCallback}
        dispatchActionToLog={dispatchActionToLog}
      />
      <RadioButtonGroup
        className="radio-group"
        legendText="Select time frame"
        disabled={timeframes === null || timeframes?.length === 0 ? true : false}
        valueSelected={timeFramesValue}
        name="timeframe"
      >
        {timeframes !== null ? (
          timeframes?.map((tf, i) => (
            <RadioButton
              key={uuid()}
              labelText={tf.text}
              onClick={handleRadioClick}
              value={tf.value}
              id={`radio-${i + 1}`}
            ></RadioButton>
          ))
        ) : (
          <Loading small={true} withOverlay={false} />
        )}
      </RadioButtonGroup>
      <Slider
        inputType="number"
        className="slider"
        required
        invalidText="Must be a number, in range 1-1000"
        invalid={limit >= 1 && limit <= 1000 ? false : true}
        labelText={'Choose limit ("maximum amount of results")'}
        value={limit}
        min={1}
        max={1000}
        step={1}
        stepMultiplier={100}
        onChange={handleSliderChange}
      />
      <div>
        <Button
          type="submit"
          disabled={cryptoCurrencies === null || loadingPriceData ? true : false}
        >
          Get price data
        </Button>
        {submitError && <p className="error-msg">{submitError}</p>}
      </div>
    </Form>
  );
}
export default PriceDataForm;
