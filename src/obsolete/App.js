import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
// import Favourits from "./components/Favourits";
import FilterDropDown from "./components/FilterDropDown";
import { SearchMovie } from "./api";
function App() {

    const [movies, setMovies] = useState([]);// state to store the movie fetch from the api
    const [error, setError] = useState("");// state to store error message
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");
    // const [favourits, setFavourits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 10;

    //handlesearch function to fetch movies based on search term
    const handleSearch = useCallback(async (searchTerm) => {
        try {
            setLoading(true);
            setCurrentPage(1);   // ✅ RESET PAGE
            const data = await SearchMovie(searchTerm, filter);
            setMovies(data.Search || []);
            setError("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading to false after fetch is complete
        }
    }, [filter]); // dependency array includes filter because search results depend on it

    //load defaults movie by calling the handlesearch
    useEffect(() => {
        const loadDefaultMovies = async () => {
            await handleSearch("movies");
        };
        loadDefaultMovies();
    }, [handleSearch]);

    //function to handle filter change
    const handleFilterChange = (filter) => {
        setFilter(filter);
        setCurrentPage(1); // Reset to first page on filter change
    };

    //update the current page state
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // calculate the current movies to display
    // const indexOfLastMovie = currentPage * moviesPerPage;
    // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);


    // display total page
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    //cotains all page number from the pagination button
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(i);
    }

    //condition if the data is loading
    if (loading) {
        return <h1 className="text-4xl">Data is Loading please wait...</h1>
    }

    //conditon if there is an error
    if (error) {
        return <h1 className="text-2xl text-red-600 font-bold">Error: {error}</h1>
    }


    return (
        <Router>
            <header className="sticky top-0 bg-gray-400 items-center flex flex-wrap gap-5 justify-between p-5 mb-1 z-50">
                <h1 className="text-3xl font-extrabold">Movie App</h1>
                <SearchBar onSearch={handleSearch} />
                <div className="flex flex-wrap gap-5 justify-between" >
                    <FilterDropDown onFilterChange={handleFilterChange} />
                </div>
            </header>
            <main>
                <div>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <MovieList movies={currentMovies} />
                                {/* pagination */}
                                <div className="flex">
                                    {paginationNumbers.map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePagination(pageNumber)}
                                            className={`py-1 px-2 rounded my-4 mx-2 ${currentPage === pageNumber ? "bg-blue-500" : "bg-gray-500"}`}
                                        >{pageNumber}</button>
                                    ))}
                                </div>
                            </>
                        } />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                    </Routes>
                </div>
            </main>
        </Router>
    )

}
export default App;