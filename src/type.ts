export interface WeatherApiResponse {
  location: { name: string; country: string };
  current: CurrentWeather;
  forecast: Forecast;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code?: number;
}

export interface Hour {
  time: string;
  temp_c: number;
  temp_f: number;
}

export interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    maxtemp_c: number;
    mintemp_c: number;
    condition: WeatherCondition;
  };
  hour: Hour[];
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface CurrentWeather {
  humidity: number;
  wind_kph: number;
  pressure_mb: number;
}

export interface WeatherDetailsProps {
  cityName: string;
  forecast: Forecast;
  current: CurrentWeather;
}

export type WeatherType = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
  };
};
