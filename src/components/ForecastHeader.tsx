import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { TbPinnedFilled, TbPinned } from "react-icons/tb";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useTempUnit } from "../hooks/useTempUnit";

interface CitySuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface BookMarksType {
  cityName: string;
  isSave: boolean;
  isPin: boolean;
}

const Header = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const { unit, toggleUnit } = useTempUnit();
  const { cityName } = useParams<{ cityName: string }>();
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [BookMarks, setBookMarks] = useState<BookMarksType[]>(
    JSON.parse(localStorage.getItem("BookMarks") || "[]")
  );
  const navigate = useNavigate();

  const isCityPage = location.pathname.startsWith("/city/");

  const isBookMark = cityName
    ? BookMarks.some((d) => d.cityName === cityName && d.isSave)
    : false;

  const isPin = cityName
    ? BookMarks.some((d) => d.cityName === cityName && d.isPin)
    : false;

  // 🔍 Fetch autocomplete suggestions
  const fetchCities = async (value: string) => {
    if (value.length < 2) return setSuggestions([]);
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=2d3ba7e748b1454fbe525406250311&q=${value}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    navigate(`/city/${city}`);
  };

  // 📍 Bookmark toggle
  const handleToggleBookMark = () => {
    if (!cityName) return;

    const exists = BookMarks.find((c) => c.cityName === cityName);
    const updated = exists
      ? BookMarks.filter((d) => d.cityName !== cityName)
      : [...BookMarks, { cityName, isSave: true, isPin: false }];

    setBookMarks(updated);
    localStorage.setItem("BookMarks", JSON.stringify(updated));
  };

  // 📌 Pin toggle
  const handleTogglePinMark = () => {
    if (!cityName) return;

    const exists = BookMarks.find((c) => c.cityName === cityName);
    const updated = exists
      ? BookMarks.map((c) =>
          c.cityName === cityName ? { ...c, isPin: !c.isPin } : c
        )
      : [...BookMarks, { cityName, isSave: false, isPin: true }];

    setBookMarks(updated);
    localStorage.setItem("BookMarks", JSON.stringify(updated));
  };

  // 🌓 Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header
      className="
        flex flex-wrap items-center justify-between gap-3
        w-full px-4 py-3
        bg-white text-gray-900 shadow-md
        dark:bg-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {/* 🔍 Search */}
      <div className="relative w-full sm:w-[22rem]">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchCities(e.target.value);
          }}
          className="
            w-full px-4 py-2 rounded-lg border border-gray-300
            dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
        />
        {suggestions.length > 0 && (
          <ul
            className="
              absolute w-full mt-1 rounded-lg shadow-lg z-20
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
              max-h-60 overflow-y-auto
            "
          >
            {suggestions.map((city, i) => (
              <li
                key={i}
                onClick={() => handleSelect(city.name)}
                className="
                  px-4 py-2 cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition
                "
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🧭 City + Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {isCityPage && (
          <div className="flex items-center gap-2">
            <p className="font-semibold text-base sm:text-lg">{cityName}</p>

            <button
              onClick={handleToggleBookMark}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title={isBookMark ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {isBookMark ? (
                <FaBookmark className="text-yellow-500" size={20} />
              ) : (
                <FaRegBookmark size={20} />
              )}
            </button>

            <button
              onClick={handleTogglePinMark}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title={isPin ? "Unpin" : "Pin city"}
            >
              {isPin ? (
                <TbPinnedFilled className="text-blue-500" size={20} />
              ) : (
                <TbPinned size={20} />
              )}
            </button>
          </div>
        )}

        <button
          onClick={toggleUnit}
          className="
          px-4 py-2 rounded-full cursor-pointer
          bg-blue-600 dark:bg-blue-500 text-white
          hover:bg-blue-700 dark:hover:bg-blue-600
          transition
        "
        >
          {unit === "C" ? "°C" : "°F"}
        </button>

        {/* 🌙 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg border border-gray-300 dark:border-gray-700
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
          "
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
