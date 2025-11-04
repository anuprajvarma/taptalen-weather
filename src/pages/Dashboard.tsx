import { useQuery } from "@tanstack/react-query";
import CityCard from "../components/CityCard";
import type { WeatherType } from "../type";
import Header, { type BookMarksType } from "../components/ForecastHeader";
import Footer from "../components/Footer";

const cities = [
  { cityName: "Delhi", isSave: false, isPin: false },
  { cityName: "Mumbai", isSave: false, isPin: false },
  { cityName: "New York", isSave: false, isPin: false },
  { cityName: "London", isSave: false, isPin: false },
];
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchWeatherData = async (): Promise<WeatherType[]> => {
  const BookMarksData = JSON.parse(localStorage.getItem("BookMarks") || "[]");
  const savemark = BookMarksData.filter(
    (d: BookMarksType) => d.isSave === true
  );
  const pinmark = BookMarksData.filter((d: BookMarksType) => d.isPin === true);
  const citiesData = [...pinmark, ...savemark];
  const allCities = citiesData.length > 0 ? citiesData : cities;

  const promises = allCities.map((data: BookMarksType) =>
    fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${data.cityName}`).then(
      (res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch weather for ${data.cityName}`);
        return res.json();
      }
    )
  );

  return Promise.all(promises);
};

const Dashboard = () => {
  const {
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useQuery<WeatherType[]>({
    queryKey: ["weatherData"],
    queryFn: fetchWeatherData,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
        {(error as Error).message || "Error fetching weather data"}
      </div>
    );

  return (
    <div
      className="
        min-h-screen 
        flex flex-col 
        bg-gray-100 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      <Header />
      <div
        className="
          flex flex-wrap justify-center gap-6 sm:gap-8
          px-4 sm:px-6 md:px-10 py-6
          w-full
        "
      >
        {weatherData?.map((city, i) => (
          <CityCard
            key={i}
            name={city.location.name}
            temp={city.current.temp_c}
            condition={city.current.condition.text}
            icon={city.current.condition.icon}
            wind={city.current.wind_kph}
            humidity={city.current.humidity}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
