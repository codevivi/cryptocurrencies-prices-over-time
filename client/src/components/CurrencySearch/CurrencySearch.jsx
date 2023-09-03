import { Select, SelectItem, Search, Form } from "@carbon/react";
import { useContext, useEffect, useState } from "react";
import { GlobalCtx } from "../../context/GlobalCtx";
import { v4 as uuid } from "uuid";
function CurrencySearch() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { cryptoCurrencies } = useContext(GlobalCtx);
  const [loadingSelect, setLoadingSelect] = useState(true);
  useEffect(() => {
    if (cryptoCurrencies === null) {
      return;
    }
    setLoadingSelect(false);
  }, [cryptoCurrencies]);

  const handleSearchChange = (e) => {
    //TODO validation, ?show drop down select ordered by matches
    let val = e.target.value;
    if (val.length > 30) {
      setErrorMsg("Input restricted to max 30 characters");
    } else {
      setErrorMsg("");
      setSearchValue(e.target.value);
    }
  };
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selected currency", selectedValue);
    console.log("searched currency", searchValue);
    //TODO
  };
  return (
    <Form onSubmit={handleSubmit} action="#" className="currency-search">
      <p className="error-msg">{errorMsg}</p>
      <Search className="search" placeholder="Find cryptocurrency" value={searchValue} onChange={handleSearchChange} labelText="Cryptocurrencies" />
      <Select id="select-1" warn={loadingSelect} warnText={"Loading..."} disabled={loadingSelect} onSelect={handleSelectChange} className="select" labelText="Select cryptocurrency" hideLabel={true}>
        <SelectItem value="" text="" />
        {cryptoCurrencies && cryptoCurrencies.map((curr) => <SelectItem key={uuid()} value={curr.id} text={curr.displayName} />)}
      </Select>
    </Form>
  );
}
export default CurrencySearch;
