import { Select, SelectItem } from "@carbon/react";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { GlobalCtx } from "../../../context/GlobalCtx";
import PropTypes from "prop-types";
function SelectInput({ handleSelectChange, selectedValue }) {
  const { cryptoCurrencies } = useContext(GlobalCtx);
  return (
    <>
      <Select className="select" id="select-1" warn={cryptoCurrencies === null ? true : false} warnText={"Loading..."} onChange={handleSelectChange} value={selectedValue} disabled={cryptoCurrencies === null ? true : false} labelText="Or Select cryptocurrency" hideLabel={false}>
        <SelectItem value="" text="" selected={true} />
        {cryptoCurrencies && cryptoCurrencies.map((curr) => <SelectItem key={uuid()} value={curr.code} text={curr.displayName} />)}
      </Select>
    </>
  );
}
export default SelectInput;

SelectInput.propTypes = {
  handleSelectChange: PropTypes.func,
  selectedValue: PropTypes.string,
};
