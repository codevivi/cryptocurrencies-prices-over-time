import { Select, SelectItem, Search, Form } from "@carbon/react";
import { useState } from "react";
function CurrencySearch() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearchChange = (e) => {
    //TODO validation, ?show drop down select ordered by matches
    let val = e.target.value;
    if (val.length > 30) {
      setErrorMsg("Input restricted to max 30 characters");
    } else {
      setErrorMsg("");
    }
    setSearchValue(e.target.value);
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
      <Select id="select-1" className="select" labelText="Select cryptocurrency" hideLabel={true} onChange={handleSelectChange}>
        <SelectItem value="" text="" />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </Select>
    </Form>
  );
}
export default CurrencySearch;
