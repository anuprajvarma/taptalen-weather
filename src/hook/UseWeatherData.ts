import { useQuery } from "@tanstack/react-query";
import type { WeatherType } from "../type";
import FetchWeatherData from "../utils/GetWeatherData";

export const UseWeatherData = () => {
  return useQuery<WeatherType[]>({
    queryKey: ["weatherData"],
    queryFn: FetchWeatherData,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
