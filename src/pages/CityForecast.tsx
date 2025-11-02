import { useEffect, useState } from "react";
import type { WeatherApiResponse } from "../type";
import { getWeatherForecast } from "../apicall";
import Header from "../components/ForecastHeader";
import WeatherDetails from "../components/ForecastList";

const Dashboard = () => {
  const [city, setCity] = useState("Delhi");
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    const res = await getWeatherForecast(cityName);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-white">
      <Header onSelectCity={setCity} currentCity={city} />
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : data ? (
        <WeatherDetails
          cityName={data.location.name}
          forecast={data.forecast}
          current={data.current}
        />
      ) : (
        <p className="text-center mt-10 text-red-400">No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
