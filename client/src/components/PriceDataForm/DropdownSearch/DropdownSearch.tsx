import { useState, useEffect, useContext, FunctionComponent } from "react";
import { ContainedList, ContainedListItem, Search } from "@carbon/react";
import { type GlobalContextValue, GlobalCtx } from "../../../context/GlobalCtx";
import { v4 as uuid } from "uuid";
import { ChangeEvent, Dispatch } from "react";
import { type PriceDataContextValue, PriceDataCtx } from "../../../context/PriceDataCtx";
import { type CryptoCurrencies } from "../../../hooks/useGetCryptoCurrencies";
import { type SetSelectedValueCallback, type ClearSubmitError, type SelectedValue, type SetSearchToLogOnSubmitCallback } from "../PriceDataForm";
import { ActionToLogDescription, type ActionToLogAction } from "../../../hooks/useLogUserAction";

type FilterCryptoCurrencies = (searchTerm: string, currencies: CryptoCurrencies) => CryptoCurrencies;

type DropdownSearchProps = {
  setSelectedValueCallback: SetSelectedValueCallback;
  clearSubmitError: ClearSubmitError;
  selectedValue: SelectedValue;
  setSearchToLogOnSubmitCallback: SetSearchToLogOnSubmitCallback;
  dispatchActionToLog: Dispatch<ActionToLogAction>;
};

const filterCryptoCurrencies: FilterCryptoCurrencies = (searchTerm, currencies) => {
  if (currencies === null) {
    return [];
  }
  searchTerm = searchTerm.trim().toLowerCase();
  if (searchTerm.length === 1) {
    return currencies.filter((listItem) => listItem.displayName.toLowerCase().startsWith(searchTerm) || listItem.code.toLowerCase().startsWith(searchTerm));
  }
  return currencies.filter((listItem) => listItem.displayName.toLowerCase().includes(searchTerm));
};

const DropdownSearch: FunctionComponent<DropdownSearchProps> = ({ setSelectedValueCallback, clearSubmitError, selectedValue, setSearchToLogOnSubmitCallback, dispatchActionToLog }) => {
  const { cryptoCurrencies } = useContext(GlobalCtx) as GlobalContextValue;
  const { clearGetPricesErrorMsg } = useContext(PriceDataCtx) as PriceDataContextValue;
  const [selectCryptoCurrencies, setSelectCryptoCurrencies] = useState<CryptoCurrencies>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleItemClick = (code: string, displayName: string) => {
    return () => {
      if (errorMsg) {
        return;
      }
      clearSubmitError();
      setSelectedValueCallback(code);
      dispatchActionToLog({ value: searchTerm, description: ActionToLogDescription.SEARCHED_CRYPTOCURRENCY });
      setSearchTerm(displayName);
      setSelectCryptoCurrencies([]);
    };
  };

  //to change select list
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
    setSearchToLogOnSubmitCallback(searchTerm);
    const timeoutId = setTimeout(() => setSelectCryptoCurrencies(filterCryptoCurrencies(searchTerm, cryptoCurrencies)), 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedValue, searchTerm, cryptoCurrencies, setSelectedValueCallback, setSearchToLogOnSubmitCallback]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearSubmitError();
    clearGetPricesErrorMsg();
    setSelectedValueCallback("");
    setSearchToLogOnSubmitCallback("");
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
        action={<Search placeholder="Type and select" isExpanded={true} disabled={cryptoCurrencies !== null ? false : true} value={searchTerm} onChange={handleChange} closeButtonLabelText="Clear search input" size="lg" labelText="Select from search matches" />}>
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
};
export default DropdownSearch;
