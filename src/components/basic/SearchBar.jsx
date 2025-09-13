const SearchBar = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-y-3 gap-x-4 max-w-3xl w-full justify-center">
        <input className="searchBar" placeholder="Search for a place..." />
        <button className="primary_btn">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
