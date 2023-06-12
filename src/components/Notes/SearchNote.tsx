import "../../styles/dashboard/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface ISearchNote {
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterText: string;
}

export default function SearchProduct({ onFilter, filterText }: ISearchNote) {
  return (
    <div className="searchBoxContainer">
      <input
        className="noteSearch"
        id="search"
        type="text"
        placeholder="Search Note"
        value={filterText}
        onChange={onFilter}
      />
      <FontAwesomeIcon icon={faSearch} className="inputIcon" />
    </div>
  );
}
