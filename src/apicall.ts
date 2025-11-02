import type { WeatherApiResponse } from "./type";

const API_KEY = "68cd7a68db194487a3f75541250211"; // or process.env.NEXT_PUBLIC_WEATHER_API_KEY
const BASE_URL = "https://api.weatherapi.com/v1";

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
