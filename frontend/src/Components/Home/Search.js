import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const posts = useSelector((state) => state.post.post);
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    if (query) {
      const results = posts.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const categoryMatch = item.category?.name.toLowerCase().includes(query);
        const tagsMatch = item.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
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
  };

  return (
    <div className="relative w-full mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
        className="w-full bg-transparent border-none outline-none z-50 text-base text-gray-700 placeholder-gray-500 pl-[-15px]"

      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
           <li
           key={suggestion._id} // Use a unique property (like `_id`) as the key
           onClick={() => handleSuggestionClick(suggestion, suggestion._id, suggestion.category.name)}
           className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center`} // Add `flex` and `items-center` for proper alignment
         >
           <i className="fas fa-search text-gray-500 w-6 mr-2"></i> {/* Icon with margin to the right */}
           {suggestion.title} {/* Render the title of the post */}
         </li>
         
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
