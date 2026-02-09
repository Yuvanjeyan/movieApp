// import { useState } from "react";
// function SearchBar({onSearch}) {
//     const [searchTerm, setSearchTerm] = useState("");
//     const handleSearch = (e) => {
//         e.preventDefault();
//         onSearch(searchTerm);
//     }
//     return(
//         <form onSubmit={handleSearch}>
//             <input 
//                 type="text"
//                 placeholder="Search your movie"
//                 value={searchTerm}
//                 onChange={(e)=>setSearchTerm(e.target.value)}
//                 className="border outline-none rounded px-4 p-2 text-black w-60"/>

//             <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
//                 font-medium rounded-md text-center text-xl px-4 py-2 ms-10">Search</button>
//         </form>
//     )
// }
// export default SearchBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        onSearch(searchTerm.trim());
        navigate("/");
    };

    return (
        <div className="flex items-center gap-3">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-80 px-5 py-3 text-white bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-red-600 focus:bg-gray-800 focus:outline-none transition-all duration-300 placeholder-gray-500 font-medium text-sm hover:border-gray-600"
            />

            <button
                type="button"
                onClick={handleSearch}
                className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 active:scale-95 font-bold rounded-lg transition-all duration-300 text-sm uppercase tracking-wider shadow-md hover:shadow-lg"
            >
                🔍 Search
            </button>
        </div>
    );
}

export default SearchBar;
