import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar, onSearch }) => {
  const user = localStorage.getItem("username");
  const isLoggedIn = Boolean(user);
  const firstletter = user ? user.charAt(0).toUpperCase() : "";

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
    onSearch(e.target.value); // Pass the search term to parent component (Homepage)
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-2 sm:px-4 py-2 bg-white shadow-md">
      {/* Hamburger Menu and Logo */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-xl text-black sm:text-2xl"
        >
          ☰
        </button>
        <div className="flex items-center space-x-1">
          <Link to={"/"}>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
              YouTube
            </span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center flex-grow max-w-xs sm:max-w-md ml-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search"
          className="flex-grow px-2 py-1 text-xs sm:text-sm md:text-base rounded-l-full border border-gray-300 text-black focus:outline-none"
        />
        <button className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-full">
          <span className="text-base sm:text-lg">🔍</span>
        </button>
      </div>

      {/* Profile and Notifications */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="text-lg text-black">
          <Link to={"/userprofile"}>
            <span className="text-xl">➕</span>
          </Link>
        </button>

        <button className="text-lg text-black">
          <span className="text-xl">🔔</span>
        </button>

        {/* Conditional Link to Profile or Sign-in form */}
        <Link to={isLoggedIn ? "/userprofile" : "/form"}>
          {isLoggedIn ? (
            <span className="text-red-600 font-medium border-2 border-red-600 rounded-full flex items-center justify-center w-10 h-10 bg-red-100">
              {firstletter}
            </span>
          ) : (
            <span className="text-blue-800 text-sm sm:text-base">Sign in</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
