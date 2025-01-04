import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const posts = useSelector((state) => state.post.post);

  const [searchTerm, setSearchTerm] = useState(""); 
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    if (query) {
      const results = posts.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const categoryMatch = item.category?.name.toLowerCase().includes(query);
        const tagsMatch = item.tags.some((tag) =>tag.toLowerCase().includes(query));
        return titleMatch || categoryMatch || tagsMatch;
      });
      setSuggestions(results);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion,id,category) => {
    setSearchTerm(suggestion.title); // Set the title in the input field
    setShowDropdown(false);
    navigate(`/viewpost/${id}/${category}`)
    setSearchTerm('')
  };

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
  <input
    type="text"
    value={searchTerm}
    onChange={handleInputChange}
    placeholder="Search"
    className="w-full bg-transparent border-none outline-none text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-gray-700 placeholder-gray-500 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  {showDropdown && suggestions.length > 0 && (
    <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-80 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion._id}
          onClick={() =>
            handleSuggestionClick(suggestion, suggestion._id, suggestion.category.name)
          }
          className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
        >
          <i className="fas fa-search text-gray-500 w-6 mr-2"></i>
          {suggestion.title}
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Search;
