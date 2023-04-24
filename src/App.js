import { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import Navbar from './components/Navbar';
import Pagination from './components/Pagination';
import Loading from './components/Loading';

function App() {

  const [beers, setBeer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);

  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const [error, setError] = useState(true);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((res) => setBeer(res))
      .catch((err) => setError(err));
    setPostsPerPage(12);
    setError(false);
  }, []);


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = beers.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const updatedRecentSearches = [
        searchTerm,
        ...recentSearches.filter((search) => search !== searchTerm).slice(0, 4)
      ];
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecentSearches)
      );
    }
  };

  const filteredProducts =
    searchTerm === ""
      ? beers
      : beers.filter((beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="App">
      <Navbar beers={currentPosts} handleSearch={handleSearch} recentSearches={recentSearches} />

      {error ? (<Loading />) : (
        <>
          <div className="Homepage">
            <List beers={currentPosts} filteredProducts={filteredProducts} />
            {filteredProducts.length > 12 &&
              <Pagination totalPosts={beers.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
