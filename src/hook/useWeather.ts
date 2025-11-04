import { useQuery } from "@tanstack/react-query";
import type { WeatherApiResponse } from "../type";
import { getWeatherForecast } from "../apicall";

export const UseWeather = (city: string) => {
  return useQuery<WeatherApiResponse>({
    queryKey: ["weather", city],
    queryFn: () => getWeatherForecast(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
