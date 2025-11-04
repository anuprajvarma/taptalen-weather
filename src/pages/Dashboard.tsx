import CityCard from "../components/CityCard";
import Header from "../components/ForecastHeader";
import Footer from "../components/Footer";
import { UseWeatherData } from "../hook/UseWeatherData";

const Dashboard = () => {
  const { data: weatherData, isLoading, isError, error } = UseWeatherData();

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
