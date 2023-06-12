import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function FilterByDate({
  onOrderClick,
  sortType,
}: {
  onOrderClick: React.MouseEventHandler<HTMLElement>;
  sortType: string;
}) {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div
      className="filterDropdown"
      onClick={() => {
        setOpenFilter((prevOpen) => !prevOpen);
      }}
    >
      <button className="filterBtn">
        <FontAwesomeIcon icon={faSort} className="filterIcon" />
        <p>
          Filter by Date{" "}
          <span className="sortType">(Currently: {sortType})</span>
        </p>
      </button>
      <div className={`filterDropdown-body ${openFilter ? "open" : ""}`}>
        <div
          className="filterDropdown-item"
          onClick={onOrderClick}
          data-value="createdAt:asc"
        >
          Ascending
        </div>
        <div
          className="filterDropdown-item"
          onClick={onOrderClick}
          data-value="createdAt:desc"
        >
          Descending
        </div>
      </div>
    </div>
  );
}
