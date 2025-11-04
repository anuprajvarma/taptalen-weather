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
  precip_mm: number;
  wind_kph: number;
  wind_dir: string;
}

export interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    maxtemp_c: number;
    mintemp_c: number;
    condition: WeatherCondition;
    totalprecip_mm: number;
    maxwind_kph: number;
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

export interface TemperatureState {
  unit: "C" | "F";
}

export interface CityCardProps {
  name: string;
  temp: number;
  condition: string;
  icon: string;
  wind: number;
  humidity: number;
}

export interface CitySuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface BookMarksType {
  cityName: string;
  isSave: boolean;
  isPin: boolean;
}

export interface ChartProps {
  hourlyData: {
    time: string;
    temp: number;
    precip_mm: number;
    wind_kph: number;
  }[];
  dailyData: {
    date: string;
    avgtemp_c: number;
    avgtemp_f: number;
    totalprecip_mm: number;
    maxwind_kph: number;
  }[];
}

export interface WeatherDetailsProps {
  cityName: string;
  forecast: Forecast;
  current: CurrentWeather;
}
