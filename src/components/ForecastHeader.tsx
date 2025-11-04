import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { TbPinnedFilled, TbPinned } from "react-icons/tb";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/Store";
import { toggleUnit } from "../redux/slices/TempFormSlice";
import type { BookMarksType, CitySuggestion } from "../type";
import GoogleLoginButton from "./GoogleLoginButton";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Header = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.temp.unit);
  const { cityName } = useParams<{ cityName: string }>();
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [BookMarks, setBookMarks] = useState<BookMarksType[]>(
    JSON.parse(localStorage.getItem("BookMarks") || "[]")
  );
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const isCityPage = location.pathname.startsWith("/city/");

  const isBookMark = cityName
    ? BookMarks.some((d) => d.cityName === cityName && d.isSave)
    : false;

  const isPin = cityName
    ? BookMarks.some((d) => d.cityName === cityName && d.isPin)
    : false;

  // 🧠 Fetch city suggestions
  const fetchCities = async (value: string) => {
    if (value.length < 2) return setSuggestions([]);
    const res = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${value}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  // 🧠 Select city from suggestions
  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    navigate(`/city/${city}`);
  };

  // 🧠 Check login before protected actions
  const handleProtectedAction = (callback: () => void) => {
    const loginStatus = JSON.parse(localStorage.getItem("isLogin") || "{}");

    if (!loginStatus) {
      setShowPopup(true);
      return;
    }
    callback();
  };

  // 🧠 Toggle Bookmark
  const handleToggleBookMark = () => {
    handleProtectedAction(() => {
      if (!cityName) return;

      const exists = BookMarks.find((c) => c.cityName === cityName);
      const updated = exists
        ? BookMarks.filter((d) => d.cityName !== cityName)
        : [...BookMarks, { cityName, isSave: true, isPin: false }];

      setBookMarks(updated);
      localStorage.setItem("BookMarks", JSON.stringify(updated));
    });
  };

  // 🧠 Toggle Pin
  const handleTogglePinMark = () => {
    handleProtectedAction(() => {
      if (!cityName) return;

      const exists = BookMarks.find((c) => c.cityName === cityName);
      const updated = exists
        ? BookMarks.map((c) =>
            c.cityName === cityName ? { ...c, isPin: !c.isPin } : c
          )
        : [...BookMarks, { cityName, isSave: false, isPin: true }];

      setBookMarks(updated);
      localStorage.setItem("BookMarks", JSON.stringify(updated));
    });
  };

  // 🌙 Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 💾 Persist theme + check login
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header
      className="
        flex flex-wrap items-center justify-between gap-3
        w-full px-4 py-3
        bg-white text-gray-900 shadow-md
        dark:bg-gray-800 dark:text-gray-100
        transition-colors duration-300 sticky top-0 z-30
      "
    >
      {/* Search Input */}
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
            bg-gray-50 dark:bg-gray-900
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

      {/* Right Controls */}
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

        {/* Temperature Unit */}
        <button
          onClick={() => dispatch(toggleUnit())}
          className="
            px-4 py-2 rounded-full cursor-pointer
            bg-blue-600 dark:bg-blue-500 text-white
            hover:bg-blue-700 dark:hover:bg-blue-600
            transition
          "
        >
          {unit === "C" ? "°C" : "°F"}
        </button>

        {/* Theme Button */}
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

        {/* Google Login */}
        <GoogleLoginButton />
      </div>

      {/* Login Required Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center w-[90%] sm:w-[25rem]">
            <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              You need to log in to save or pin cities
            </p>
            <GoogleLoginButton />
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
