import React, { useState } from 'react'
import Logo from './logo.png';
const Navbar = ({ handleSearch, recentSearches, beers }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(true);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
    setIsActive(true)
  };

  const handleRecentSearch = (recentSearch) => {
    setSearchTerm(recentSearch);
    handleSearch(recentSearch);
    setIsActive(true)
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluidc">
          <a className="navbar-brand" href="/"><img className='Logo' alt='' src={Logo} /></a>
          <form onSubmit={handleSubmit} className="d-flex search-form my-1" role="search">
            <input onClick={() => { setIsActive(false) }} value={searchTerm} onChange={handleInputChange} className="form-control me-2 nav-search" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-warning search-btn " type="submit">Search</button>
            <div className={`dropdown ${isActive === true ? 'inactive' : ''} dropdown-menu`} aria-labelledby="navbarDropdown">
              {searchTerm.length === 0 && <div className="dropdown-row dropdown-item"><b>Recent Searches:</b></div>}

              {beers
                .filter((item) => {
                  const searchterm = searchTerm.toLowerCase();
                  const fullName = item.name.toLowerCase();

                  return (
                    searchterm &&
                    fullName.startsWith(searchterm) &&
                    fullName !== searchterm
                  );
                })
                .slice(0, 5)
                .map((item) => (
                  <div onClick={() => handleRecentSearch(item.name)}
                    className="dropdown-row dropdown-item"
                    key={item.id}
                  >
                    {item.name}
                  </div>
                ))}

              {searchTerm.length === 0 && recentSearches.map((recentSearch) => (
                <div className="dropdown-row dropdown-item" key={recentSearch} onClick={() => handleRecentSearch(recentSearch)}
                >
                  {recentSearch}
                </div>
              ))}
            </div>
          </form>

        </div>
      </nav>
    </div>
  )
}

export default Navbar