import { useParams } from "react-router-dom";
import Header from "../components/ForecastHeader";
import WeatherDetails from "../components/ForecastList";
import { UseWeather } from "../hook/useWeather";

export const CityForecast = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { data, isLoading, error } = UseWeather(cityName ?? "Delhi");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Fetching weather data...
            </p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg font-medium mt-10">
            {(error as Error).message}
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
