import { useState, useEffect, useContext } from "react";
import { ContainedList, ContainedListItem, ExpandableSearch } from "@carbon/react";
import { GlobalCtx } from "../../../context/GlobalCtx";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const filterCryptoCurrencies = (searchTerm, currencies) => {
  return currencies.filter((listItem) => listItem.displayName.toLowerCase().includes(searchTerm.trim().toLowerCase()));
};

function ExpandableSearchInput({ setSelectedValueCallback }) {
  const { cryptoCurrencies } = useContext(GlobalCtx);
  const [selectCryptoCurrencies, setSelectCryptoCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleItemClick = (code, displayName) => {
    return () => {
      if (errorMsg) {
        return;
      }
      setSelectedValueCallback(code);
      setSearchTerm(displayName);
    };
  };

  useEffect(() => {
    if (!searchTerm) {
      setSelectCryptoCurrencies([]);
      setSelectedValueCallback(null);
      return;
    }

    if (searchTerm.length < 2) {
      return;
    }
    const timeoutId = setTimeout(() => setSelectCryptoCurrencies(filterCryptoCurrencies(searchTerm, cryptoCurrencies)), 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, cryptoCurrencies, setSelectedValueCallback]);

  const handleChange = (event) => {
    if (searchTerm.length > 30) {
      setErrorMsg("Only 30 characters allowed");
      return;
    }
    setErrorMsg("");
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <p className="error-msg">{errorMsg}</p>
      <ContainedList className="search" label="Cryptocurrency search" kind="on-page" action={<ExpandableSearch placeholder="Type and select" isExpanded={true} value={searchTerm} onChange={handleChange} closeButtonLabelText="Clear search input" size="lg" />}>
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
};
