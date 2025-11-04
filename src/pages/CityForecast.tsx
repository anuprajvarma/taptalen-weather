import { useEffect, useState } from "react";
import type { WeatherApiResponse } from "../type";
import { getWeatherForecast } from "../apicall";
import Header from "../components/ForecastHeader";
import WeatherDetails from "../components/ForecastList";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getWeatherForecast(city);
      setData(res);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(cityName ?? "Delhi");
  }, [cityName]);

  return (
    <div
      className="
        min-h-screen 
        bg-gray-100 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
        flex flex-col
      "
    >
      <Header />
      <main
        className="
          flex-grow 
          w-full max-w-6xl mx-auto 
          px-4 sm:px-6 md:px-8 
          py-6 sm:py-10
        "
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Fetching weather data...
            </p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg font-medium mt-10">
            {error}
          </p>
        ) : data ? (
          <WeatherDetails
            cityName={data.location.name}
            forecast={data.forecast}
            current={data.current}
          />
        ) : (
          <p className="text-center text-red-400 mt-10 text-lg">
            No weather data available.
          </p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
