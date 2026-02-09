import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetails as getMovieDetails } from "../api";


function MovieDetails({ onAddFavourits }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError("Failed to fetch movie details.");
            }
        };
        fetchDetail();
    }, [id]);

    const handleAddToFavourites = () => {
        if (movie) {
            onAddFavourits(movie);
            // avoid alert in production but keep for now
            alert(`✅ ${movie.Title} added to favorites!`);
        }
    };

    const handleGoBack = () => navigate(-1);
    const handleGoHome = () => navigate("/");

    if (!movie) return <h1 className="text-3xl text-center font-medium mt-20 text-gray-400">⏳ Loading...</h1>;
    if (error) return <h1 className="text-2xl text-red-500 text-center mt-20">❌ Error Loading Movie Details</h1>;

    return (
        <div className="w-full min-h-screen px-4 md:px-8">
            <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 items-start">
                <div className="col-span-1 flex flex-col items-start gap-6">
                    <img src={movie.Poster} alt={movie.Title} className="w-full max-w-xs justify-center rounded-xl shadow-xl object-cover " />

                    <div className="w-full flex flex-col gap-3">
                        <button onClick={handleAddToFavourites} className="w-full inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition">⭐ Add to Favorites</button>
                        <div className="flex gap-3">
                            <button onClick={handleGoBack} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-100 py-2 rounded-lg transition">← Go Back</button>
                            <button onClick={handleGoHome} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-100 py-2 rounded-lg transition">🏠 Home</button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="md:col-span-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">{movie.Title}</h1>

                    <div className="flex flex-wrap gap-3 items-center font-bold ">
                        <span className="inline-flex items-center gap-2 bg-gray-800 text-gray-100 px-3 py-1 rounded-full text-sm">📅 {movie.Year}</span>
                        <span className="inline-flex items-center gap-2 bg-gray-800 text-gray-100 px-3 py-1 rounded-full text-sm">⭐ {movie.imdbRating || 'N/A'}/10</span>
                        <span className="inline-flex items-center gap-2 bg-gray-800 text-gray-100 px-3 py-1 rounded-full text-sm">🎬 {movie.Type}</span>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">Plot</h2>
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg">{movie.Plot}</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-5 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">🎬 Genre</h3>
                            <p className="text-gray-300">{movie.Genre}</p>
                        </div>

                        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-5 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">👥 Cast</h3>
                            <p className="text-gray-300">{movie.Actors}</p>
                        </div>

                        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-5 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">📅 Released</h3>
                            <p className="text-gray-300">{movie.Released}</p>
                        </div>

                        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-5 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">👨‍💼 Director</h3>
                            <p className="text-gray-300">{movie.Director}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;