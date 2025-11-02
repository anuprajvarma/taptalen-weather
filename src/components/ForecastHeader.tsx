import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Heart, Save } from "lucide-react";

interface CitySuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface HeaderProps {
  onSelectCity: (city: string) => void;
  currentCity: string;
}

const Header: React.FC<HeaderProps> = ({ onSelectCity, currentCity }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();

  // Fetch autocomplete cities
  const fetchCities = async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=68cd7a68db194487a3f75541250211&q=${value}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    onSelectCity(city);
  };

  // Save to favorites in localStorage
  const handleSaveCity = () => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!existing.includes(currentCity)) {
      const updated = [...existing, currentCity];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${currentCity} added to favorites ✅`);
    } else {
      alert("City already in favorites!");
    }
  };

  // Theme toggle
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

      {/* 🌍 Current City + Actions */}
      <div className="flex items-center gap-4">
        <p className="font-semibold text-lg">{currentCity}</p>

        <button
          onClick={handleSaveCity}
          className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
          title="Save to Favorites"
        >
          <Save size={18} />
        </button>

        <button
          onClick={() => navigate("/favorites")}
          className="p-2 bg-pink-600 hover:bg-pink-500 rounded-lg"
          title="Go to Favorites"
        >
          <Heart size={18} />
        </button>

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
