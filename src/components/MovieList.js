import { Link } from "react-router-dom";

function MovieList({ movies, onAddFavourits }) {
    if (!movies || movies.length === 0) {
        return (
            <h1 className="text-3xl text-center font-bold text-red-500 uppercase py-20">
                🔍 No movies found
            </h1>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-2 mb-6">
            {movies.map((movie) => (
                <div
                    key={movie.imdbID}
                    className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer scale-95 z-0"
                >
                    {/* Poster Image */}
                    <Link to={`/movie/${movie.imdbID}`} className="block relative overflow-hidden">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full aspect-[2/3] object-cover group-hover:brightness-75 text-white transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>

                    {/* Info Section */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h2 className="text-sm text-white font-bold line-clamp-2 mb-2">{movie.Title}</h2>
                        <div className="flex justify-between items-center text-xs text-gray-300 mb-3">
                            <span className="font-semibold">📅 {movie.Year}</span>
                            <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold">{movie.Type}</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 flex-col">
                            <Link
                                to={`/movie/${movie.imdbID}`}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-center text-xs transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg uppercase tracking-wider"
                            >
                                📺 View Details
                            </Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onAddFavourits(movie);
                                    alert(`✅ ${movie.Title} added to favorites!`);
                                }}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded text-center text-xs transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg uppercase tracking-wider"
                            >
                                ⭐ Add Fav
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
