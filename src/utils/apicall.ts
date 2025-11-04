import { API_KEY, BASE_URL } from "../constants/AppConfig";
import type { WeatherApiResponse } from "../type";

export const getWeatherForecast = async (
  city: string
): Promise<WeatherApiResponse> => {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
    );
    if (!res.ok) {
      throw new Error(`WeatherAPI Error: ${res.statusText}`);
    }
    const data = (await res.json()) as WeatherApiResponse;
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};
