import { useQuery } from "@tanstack/react-query";
import type { WeatherType } from "../type";
import FetchWeatherData from "../utils/GetWeatherData";
import type { RootState } from "../redux/Store";
import { useSelector } from "react-redux";

export const UseWeatherData = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  return useQuery<WeatherType[]>({
    queryKey: ["weatherData", isLogin],
    queryFn: FetchWeatherData,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
