import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { CurrentWeather, Forecast } from "../type";

interface WeatherDetailsProps {
  cityName: string;
  forecast: Forecast;
  current: CurrentWeather;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  cityName,
  forecast,
  current,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Select current day by default
  useEffect(() => {
    setSelectedDayIndex(0);
  }, [forecast]);

  const selectedDay = forecast.forecastday[selectedDayIndex];
  const hourlyData = selectedDay.hour.map((h) => ({
    time: h.time.split(" ")[1],
    temp: h.temp_c,
  }));

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">{cityName} Forecast</h2>

      {/* 🌤️ 7-Day Forecast Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {forecast.forecastday.map((day, i) => {
          const isActive = i === selectedDayIndex;
          return (
            <button
              key={day.date}
              onClick={() => setSelectedDayIndex(i)}
              className={`p-4 rounded-xl flex flex-col items-center transition duration-300 ${
                isActive
                  ? "bg-blue-600 scale-105 shadow-lg"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <p className="text-sm">{day.date}</p>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-12 h-12"
              />
              <p className="font-semibold">{day.day.avgtemp_c}°C</p>
              <p className="text-xs">{day.day.condition.text}</p>
            </button>
          );
        })}
      </div>

      {/* 📈 Hourly Temperature Graph */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">
          Hourly Temperature — {selectedDay.date}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Detail Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Max Temp</p>
          <p className="text-xl font-bold">{selectedDay.day.maxtemp_c}°C</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Min Temp</p>
          <p className="text-xl font-bold">{selectedDay.day.mintemp_c}°C</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Condition</p>
          <p className="text-xl font-bold">{selectedDay.day.condition.text}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Humidity</p>
          <p className="text-xl font-bold">{current.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
