import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { TbPinnedFilled, TbPinned } from "react-icons/tb";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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
  const { cityName } = useParams<{ cityName: string }>();
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [BookMarks, setBookMarks] = useState<BookMarksType[]>(
    JSON.parse(localStorage.getItem("BookMarks") || "[]")
  );
  const navigate = useNavigate();

  const isCityPage = location.pathname.startsWith("/city/");

  const isBookMark = cityName
    ? BookMarks.filter((d) => d.cityName === cityName && d.isSave === true)
        .length > 0
      ? true
      : false
    : false;

  const isPin = cityName
    ? BookMarks.filter((d) => d.cityName === cityName && d.isPin === true)
        .length > 0
      ? true
      : false
    : false;

  // 🔍 Fetch autocomplete cities
  const fetchCities = async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
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

  const handleToggleBookMark = () => {
    if (!cityName) return;

    const existing = BookMarks.find((c) => c.cityName === cityName);

    let updatedBookMarks;

    if (existing) {
      // If city already exists → toggle save (optional) or just ignore
      updatedBookMarks = BookMarks.filter((d) => d.cityName !== cityName);
    } else {
      // Add city as saved (not pinned)
      updatedBookMarks = [
        ...BookMarks,
        { cityName, isSave: true, isPin: false },
      ];
    }

    setBookMarks(updatedBookMarks);
    localStorage.setItem("BookMarks", JSON.stringify(updatedBookMarks));
  };

  const handleTogglePinMark = () => {
    if (!cityName) return;

    const existing = BookMarks.find((c) => c.cityName === cityName);
    let updatedBookMarks;

    if (!existing) {
      updatedBookMarks = [
        ...BookMarks,
        { cityName, isSave: false, isPin: true },
      ];
    } else {
      updatedBookMarks = BookMarks.map((c) =>
        c.cityName === cityName ? { ...c, isSave: false, isPin: !c.isPin } : c
      );
    }

    setBookMarks(updatedBookMarks);
    localStorage.setItem("BookMarks", JSON.stringify(updatedBookMarks));
  };

  // 🌙 Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme on load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="flex items-center justify-between bg-slate-900 dark:bg-slate-800 text-white p-4 shadow-md">
      {/* 🔍 Search Bar */}
      <div className="relative w-[20rem]">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchCities(e.target.value);
          }}
          className="w-full px-4 py-2 rounded-lg text-slate-200 outline-none border border-slate-700"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-20">
            {suggestions.map((city, i) => (
              <li
                key={i}
                onClick={() => handleSelect(city.name)}
                className="p-2 hover:bg-slate-700 cursor-pointer"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🌍 City Info & Actions */}
      <div className="flex items-center gap-4">
        {isCityPage && (
          <div className="flex items-center gap-4">
            <p className="font-semibold text-lg">{cityName}</p>

            <button
              onClick={handleToggleBookMark}
              className="p-2 rounded-lg hover:bg-slate-700 transition"
              title={isBookMark ? "Remove from BookMarks" : "Add to BookMarks"}
            >
              {isBookMark ? (
                <FaBookmark className="text-slate-400" size={22} />
              ) : (
                <FaRegBookmark size={22} />
              )}
            </button>
            <button
              onClick={handleTogglePinMark}
              className="p-2 rounded-lg hover:bg-slate-700 transition"
              title={isBookMark ? "Remove from pinnmark" : "Add to pinnmark"}
            >
              {isPin ? (
                <TbPinnedFilled className="text-slate-400" size={22} />
              ) : (
                <TbPinned size={22} />
              )}
            </button>
          </div>
        )}

        {/* 🌙 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
