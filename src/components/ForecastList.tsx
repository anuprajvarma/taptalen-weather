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
import { useTempUnit } from "../hooks/useTempUnit";

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
  const { unit } = useTempUnit();

  useEffect(() => {
    setSelectedDayIndex(0);
  }, [forecast]);

  const selectedDay = forecast.forecastday[selectedDayIndex];
  const hourlyData = selectedDay.hour.map((h) => ({
    time: h.time.split(" ")[1],
    temp: unit === "C" ? h.temp_c : h.temp_f,
  }));

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 🏙 City Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center capitalize">
        {cityName} Forecast
      </h2>

      {/* 🌤️ 7-Day Forecast Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {forecast.forecastday.map((day, i) => {
          const isActive = i === selectedDayIndex;
          return (
            <button
              key={day.date}
              onClick={() => setSelectedDayIndex(i)}
              className={`p-4 rounded-xl flex flex-col items-center transition-all duration-300 text-sm sm:text-base ${
                isActive
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                {day.date}
              </p>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-10 h-10 sm:w-12 sm:h-12 my-2"
              />
              <p className="font-semibold">
                {unit === "C"
                  ? day.day.avgtemp_c
                  : (day.day.avgtemp_c * 9) / 5 + 32}
                °{unit}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[6rem]">
                {day.day.condition.text}
              </p>
            </button>
          );
        })}
      </div>

      {/* 📈 Hourly Temperature Graph */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm transition-colors">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Hourly Temperature — {selectedDay.date}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="time"
              stroke="currentColor"
              style={{ fontSize: "0.8rem" }}
            />
            <YAxis
              stroke="currentColor"
              style={{ fontSize: "0.8rem" }}
              width={35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "0.5rem",
                border: "none",
                color: "#fff",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Detail Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {[
          {
            label: "Max Temp",
            value: `${
              unit === "C"
                ? selectedDay.day.maxtemp_c
                : (selectedDay.day.maxtemp_c * 9) / 5 + 32
            }°${unit}`,
          },
          {
            label: "Min Temp",
            value: `${
              unit === "C"
                ? selectedDay.day.mintemp_c
                : (selectedDay.day.mintemp_c * 9) / 5 + 32
            }°${unit}`,
          },
          { label: "Condition", value: selectedDay.day.condition.text },
          { label: "Humidity", value: `${current.humidity}%` },
        ].map((info) => (
          <div
            key={info.label}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {info.label}
            </p>
            <p className="text-lg sm:text-xl font-bold">{info.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
