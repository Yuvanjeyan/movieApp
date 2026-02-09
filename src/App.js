import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FilterDropDown from "./components/FilterDropDown";
import Favourits from "./components/Favourits";
import { SearchMovie } from "./api";

function AppContent() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [favourits, setFavourits] = useState([]);

    const [filter, setFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("movies");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const moviesPerPage = 12;
    const apiPageSize = 10;

    // Fetch movies
    const handleSearch = useCallback(
        async (term = searchTerm, page = 1) => {
            try {
                setLoading(true);
                setError("");
                setSearchTerm(term);
                setCurrentPage(page);
                const startIndex = (page - 1) * moviesPerPage;
                const endIndex = startIndex + moviesPerPage;
                const firstApiPage = Math.floor(startIndex / apiPageSize) + 1;
                const lastApiPage = Math.floor((endIndex - 1) / apiPageSize) + 1;

                const requests = [SearchMovie(term, filter, firstApiPage)];
                if (lastApiPage > firstApiPage) {
                    requests.push(SearchMovie(term, filter, lastApiPage));
                }

                const [firstData, secondData] = await Promise.all(requests);
                const firstResults = (firstData && firstData.Search) || [];
                const secondResults = (secondData && secondData.Search) || [];
                let results = [...firstResults, ...secondResults];
                
                // Filter results on client side based on type filter
                if (filter) {
                    results = results.filter(movie => movie.Type.toLowerCase() === filter.toLowerCase());
                }

                const offsetInCombined = startIndex - (firstApiPage - 1) * apiPageSize;
                const visibleMovies = results.slice(offsetInCombined, offsetInCombined + moviesPerPage);
                
                setMovies(visibleMovies);
                // Use the API's totalResults, not just the current page
                setTotalResults(Number(firstData && firstData.totalResults) || 0);
            } catch (err) {
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        },
        [filter, searchTerm]
    );

    // Load default movies
    useEffect(() => {
        handleSearch("movies", 1);
    }, []);

    // Filter change
    const handleFilterChange = (value) => {
        setFilter(value);
        handleSearch(searchTerm, 1);
    };

    // Handle home click
    const handleHomeClick = () => {
        setFilter("");
        setSearchTerm("movies");
        setMovies([]);
        navigate("/");
        handleSearch("movies", 1);
    };

    const addToFavourits = (movie) => {
        setFavourits((prev) => {
            if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;
            return [...prev, movie];
        });
    };

    const removeFavourits = (id) => {
        setFavourits((prev) => prev.filter((m) => m.imdbID !== id));
    };


    const totalPages = Math.ceil(totalResults / moviesPerPage);

    if (loading) {
        return <h1 className="text-4xl font-bold text-center mt-20">⏳ Loading movies...</h1>;
    }

    if (error) {
        return (
            <h1 className="text-2xl text-center text-red-600 font-bold mt-20">
                ❌ {error}
            </h1>
        );
    }

    return (
        <>
            {/* HEADER */}
            <header className="sticky top-0 z-50 w-full bg-black bg-opacity-95 backdrop-blur-md px-8 py-6 shadow-2xl border-b-4 border-red-600 flex flex-wrap gap-6 justify-between items-center">
                <h1 className="text-5xl font-bold font-bebas bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent tracking-wider whitespace-nowrap">NETFLIX</h1>
                <SearchBar onSearch={(term) => handleSearch(term, 1)} />

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleHomeClick}
                        className="px-8 py-3 text-white font-bold cursor-pointer transition-all duration-300 hover:text-red-500 hover:bg-gray-800 bg-gray-900 rounded-lg border-2 border-gray-600 hover:border-red-600 uppercase text-sm tracking-wider shadow-md hover:shadow-lg active:scale-95"
                    >
                        🏠 Home
                    </button>

                    <Link
                        to="/favourits"
                        className="px-8 py-3 text-white font-bold cursor-pointer transition-all duration-300 hover:text-red-500 hover:bg-gray-800 bg-gray-900 rounded-lg border-2 border-gray-600 hover:border-red-600 uppercase text-sm tracking-wider shadow-md hover:shadow-lg"
                    >
                        ⭐ Favourites
                    </Link>

                    <FilterDropDown
                        filter={filter}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </header>

            {/* MAIN */}
            <main className="w-full min-h-screen flex-1 bg-gradient-to-b from-black via-gray-950 to-black px-6 py-12 md:px-10 md:py-16">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <MovieList movies={movies}
                                    onAddFavourits={addToFavourits} />

                                {/* PAGINATION */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-3 mt-8 mb-8">
                                        {/* Prev */}
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => handleSearch(searchTerm, currentPage - 1)}
                                            className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            ←
                                        </button>

                                        {/* Fixed small page list: 1,2,3 (cap to totalPages) */}
                                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handleSearch(searchTerm, page)}
                                                className={`px-4 py-2 rounded-md font-bold transition ${page === currentPage ? "bg-red-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        {/* Next */}
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => handleSearch(searchTerm, currentPage + 1)}
                                            className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            →
                                        </button>
                                    </div>
                                )}

                            </>
                        }
                    />

                    <Route path="/movie/:id" element={<MovieDetails onAddFavourits={addToFavourits} />} />
                    <Route
                        path="/favourits"
                        element={
                            <Favourits
                                favourits={favourits}
                                onRemoveFavourite={removeFavourits}
                            />
                        }
                    />



                </Routes>

            </main>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
