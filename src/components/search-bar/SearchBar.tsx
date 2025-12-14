import { FiSearch } from "react-icons/fi";
import "./SearchBar.scss";

interface ISearchBarProps {
  textHolder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ textHolder, value, onChange }: ISearchBarProps) => {
  return (
    <div className="search-bar">
      <FiSearch className="icon" />
      <input
        type="text"
        value={value}
        placeholder={textHolder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
