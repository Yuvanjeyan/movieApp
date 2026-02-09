import { Link } from "react-router-dom";

function Favourits({ favourits = [], onRemoveFavourite }) {
    if (!Array.isArray(favourits) || favourits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl text-yellow-400 font-bold mb-4">⭐ My Favorites</h1>
                <p className="text-2xl text-gray-400">No favorites added yet</p>
                <p className="text-gray-500 mt-2">Start adding your favorite movies!</p>
            </div>
        );
    }

    return (
        <div className="py-8 mt-4 mb-8 px-6 md:px-10">
            <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">⭐ My Favorites</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-0">
                {favourits.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:z-10"
                    >
                        {/* Poster Image */}
                        <Link to={`/movie/${movie.imdbID}`} className="block relative overflow-hidden">
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-80 object-cover group-hover:brightness-75 transition-all duration-300"
                            />
                        </Link>

                        {/* Title */}
                        <div className="p-4">
                            <h2 className="text-sm text-white font-bold line-clamp-2 mb-2">
                                {movie.Title}
                            </h2>
                            <p className="text-xs text-gray-400 mb-4">
                                📅 {movie.Year}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-2 flex-col">
                                <Link
                                    to={`/movie/${movie.imdbID}`}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-center text-xs transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg uppercase tracking-wider"
                                >
                                    📺 View
                                </Link>

                                <button
                                    onClick={() => onRemoveFavourite(movie.imdbID)}
                                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded text-center text-xs transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg uppercase tracking-wider"
                                >
                                    ✕ Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favourits;
