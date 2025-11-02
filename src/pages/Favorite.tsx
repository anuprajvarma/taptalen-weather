import React from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">⭐ Favorite Cities</h2>
      {favorites.length === 0 ? (
        <p>No favorite cities yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((city: string, i: number) => (
            <li
              key={i}
              className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700"
              onClick={() => navigate(`/?city=${city}`)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
