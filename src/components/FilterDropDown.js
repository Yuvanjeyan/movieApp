
function FilterDropDown({filter, onFilterChange}) {
    return(
        <select 
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)} 
            className="px-6 py-3 text-white bg-gray-900 border-2 border-gray-600 rounded-lg font-bold text-sm focus:border-red-600 focus:outline-none transition-all duration-300 cursor-pointer hover:border-gray-500 uppercase tracking-wider shadow-md hover:shadow-lg"
        >
            <option value="">🎬 All Types</option>
            <option value="movie">🎞️ Movies</option>
            <option value="series">📺 Series</option>
        </select>
    )
}
export default FilterDropDown;