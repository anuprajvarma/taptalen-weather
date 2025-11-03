import { useQuery } from "@tanstack/react-query";
import CityCard from "../components/CityCard";
import type { WeatherType } from "../type";
import Header, { type BookMarksType } from "../components/ForecastHeader";

const cities = [
  { cityName: "Delhi", isSave: false, isPin: false },
  { cityName: "MUMBAI", isSave: false, isPin: false },
  { cityName: "NEW YORK", isSave: false, isPin: false },
  { cityName: "LONDON", isSave: false, isPin: false },
];
const API_KEY = "2d3ba7e748b1454fbe525406250311";

const fetchWeatherData = async (): Promise<WeatherType[]> => {
  const BookMarksData = JSON.parse(localStorage.getItem("BookMarks") || "[]");
  const savemark = BookMarksData.filter(
    (d: BookMarksType) => d.isSave === true
  );
  const pinmark = BookMarksData.filter((d: BookMarksType) => d.isPin === true);
  const citiesData = [...pinmark, ...savemark];
  const allCities = citiesData.length > 0 ? citiesData : cities;

  const promises = allCities.map((data: BookMarksType) =>
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${data.cityName}`
    ).then((res) => {
      if (!res.ok)
        throw new Error(`Failed to fetch weather for ${data.cityName}`);
      return res.json();
    })
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
      <div className="flex justify-center items-center h-screen text-slate-400">
        Loading weather data...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-400">
        {(error as Error).message || "Error fetching weather data"}
      </div>
    );

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex flex-wrap gap-8 p-4 w-[80rem]">
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
      </div>
    </div>
  );
};

export default Dashboard;
