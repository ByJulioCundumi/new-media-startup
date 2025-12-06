import { FiSearch } from 'react-icons/fi';
import './SearchBar.scss';

interface ISearchBarProps {
  textHolder: string;
  search?: string;
}

const SearchBar = ({ textHolder, search }: ISearchBarProps) => {
  return (
    <div className="search-bar">
      <FiSearch className="icon" />
      <input
        type="text"
        value={search}
        placeholder={textHolder}
      />
    </div>
  );
};

export default SearchBar;