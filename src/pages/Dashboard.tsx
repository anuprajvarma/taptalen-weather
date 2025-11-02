import { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import DashboardHeader from "../components/DashboardHeader";
import type { WeatherType } from "../type";

const cities = ["Delhi", "Mumbai", "London", "New York"];

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherType[]>([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const apiKey = "68cd7a68db194487a3f75541250211";
        const promises = cities.map((city) =>
          fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex justify-center w-full">
        <div className="flex flex-wrap gap-8 p-4 w-[80rem]">
          {weatherData.map((city, i) => (
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
