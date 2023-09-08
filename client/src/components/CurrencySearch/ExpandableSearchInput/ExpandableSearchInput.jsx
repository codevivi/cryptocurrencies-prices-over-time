import { useState, useEffect, useContext } from "react";
import { ContainedList, ContainedListItem, ExpandableSearch } from "@carbon/react";
import { GlobalCtx } from "../../../context/GlobalCtx";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { PriceDataCtx } from "../../../context/PriceDataCtx";

const filterCryptoCurrencies = (searchTerm, currencies) => {
  searchTerm = searchTerm.trim().toLowerCase();
  if (searchTerm.length === 1) {
    return currencies.filter((listItem) => listItem.displayName.toLowerCase().startsWith(searchTerm) || listItem.code.toLowerCase().startsWith(searchTerm));
  }
  return currencies.filter((listItem) => listItem.displayName.toLowerCase().includes(searchTerm));
};

function ExpandableSearchInput({ setSelectedValueCallback, clearSubmitError, selectedValue }) {
  const { cryptoCurrencies } = useContext(GlobalCtx);
  const { clearGetPricesErrorMsg } = useContext(PriceDataCtx);
  const [selectCryptoCurrencies, setSelectCryptoCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleItemClick = (code, displayName) => {
    return () => {
      if (errorMsg) {
        return;
      }
      clearSubmitError();
      setSelectedValueCallback(code);
      setSearchTerm(displayName);
      setSelectCryptoCurrencies([]);
    };
  };

  useEffect(() => {
    if (selectedValue) {
      return;
    }
    if (searchTerm.length > 30) {
      return;
    }

    if (!searchTerm) {
      setSelectCryptoCurrencies([]);
      setSelectedValueCallback(null);
      return;
    }

    const timeoutId = setTimeout(() => setSelectCryptoCurrencies(filterCryptoCurrencies(searchTerm, cryptoCurrencies)), 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedValue, searchTerm, cryptoCurrencies, setSelectedValueCallback]);

  const handleChange = (event) => {
    clearSubmitError();
    clearGetPricesErrorMsg();
    setSelectedValueCallback(null);
    setSearchTerm(event.target.value);

    if (event.target.value.length > 30) {
      setErrorMsg("Only 30 characters allowed");
    } else {
      setErrorMsg("");
    }
  };

  return (
    <>
      <p className="error-msg">{errorMsg}</p>
      <ContainedList
        className="search"
        label="Cryptocurrency search"
        kind="on-page"
        action={<ExpandableSearch placeholder="Type and select" isExpanded={true} disabled={cryptoCurrencies !== null ? false : true} value={searchTerm} onChange={handleChange} closeButtonLabelText="Clear search input" size="lg" labelText="Select from search matches" />}>
        <div className="scroll-container">
          {selectCryptoCurrencies &&
            selectCryptoCurrencies.map((listItem) => (
              <ContainedListItem onClick={handleItemClick(listItem.code, listItem.displayName)} key={uuid()}>
                {listItem.displayName}
              </ContainedListItem>
            ))}
        </div>
      </ContainedList>
    </>
  );
}
export default ExpandableSearchInput;
ExpandableSearchInput.propTypes = {
  setSelectedValueCallback: PropTypes.func,
  selectedValue: PropTypes.string,
  clearSubmitError: PropTypes.func,
};
