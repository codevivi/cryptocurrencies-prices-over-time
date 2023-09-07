import { Search } from "@carbon/react";
import PropTypes from "prop-types";
function SearchInput({ searchValue, handleSearchChange, searchErrorMsg }) {
  return (
    <>
      <p className="error-msg">{searchErrorMsg}</p>
      <p className="cds--label" aria-hidden={true}>
        Search
      </p>
      <Search className="search" placeholder="Cryptocurrency by name or code" value={searchValue} onChange={handleSearchChange} labelText="Search" />
    </>
  );
}
export default SearchInput;
SearchInput.propTypes = {
  handleSearchChange: PropTypes.func,
  searchValue: PropTypes.string,
  searchErrorMsg: PropTypes.string,
};
