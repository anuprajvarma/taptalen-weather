import { Link } from "react-router-dom";

interface CityCardProps {
  name: string;
  temp: number;
  condition: string;
  icon: string;
  wind: number;
  humidity: number;
}

const CityCard = ({
  name,
  temp,
  condition,
  icon,
  wind,
  humidity,
}: CityCardProps) => {
  return (
    <Link
      to={`/city/${name}`}
      className="
        flex flex-col sm:flex-row justify-between items-center
        gap-4 sm:gap-6 w-full max-w-sm sm:w-[20rem]
        p-5 rounded-2xl shadow-md border border-gray-200
        bg-white text-gray-800
        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
        hover:shadow-lg hover:scale-[1.02]
        transition-all duration-300 ease-in-out
      "
    >
      {/* 🌡 Left Section */}
      <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
        <p className="text-4xl sm:text-3xl font-semibold">{temp}°C</p>
        <p className="text-xl sm:text-lg font-medium truncate">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
          {condition}
        </p>
      </div>

      {/* 🌤 Right Section */}
      <div className="flex flex-col items-center sm:items-end">
        <img
          src={icon}
          alt={`${condition} icon`}
          className="w-16 h-16 sm:w-14 sm:h-14 object-contain drop-shadow-md"
        />
        <div className="text-sm mt-2 text-gray-600 dark:text-gray-300 flex flex-col items-center sm:items-end">
          <p>💧 {humidity}%</p>
          <p>🌬️ {wind} km/h</p>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
