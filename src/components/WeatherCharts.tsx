import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useTempUnit } from "../hooks/useTempUnit";

interface ChartProps {
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

const WeatherCharts = ({ hourlyData, dailyData }: ChartProps) => {
  const { unit } = useTempUnit();
  const [view, setView] = useState<"hourly" | "daily">("hourly");

  const chartData =
    view === "hourly"
      ? hourlyData.map((h) => ({
          time: h.time,
          temp: h.temp,
          precip_mm: h.precip_mm,
          wind_kph: h.wind_kph,
        }))
      : dailyData.map((d) => ({
          time: d.date.split("-").slice(1).join("/"), // MM/DD
          temp: unit === "C" ? d.avgtemp_c : d.avgtemp_f,
          precip_mm: d.totalprecip_mm,
          wind_kph: d.maxwind_kph,
        }));

  return (
    <div className="space-y-10 py-6">
      {/* 🔁 Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("hourly")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === "hourly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Hourly
        </button>
        <button
          onClick={() => setView("daily")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === "daily"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Daily
        </button>
      </div>

      {/* 🌡️ Temperature Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
          Temperature Trend ({unit === "C" ? "°C" : "°F"}) —{" "}
          {view === "hourly" ? "Hourly" : "Daily"}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ☔ Precipitation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 min-h-[350px]">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
          Precipitation (mm)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="time" stroke="#d1d5db" />
            <YAxis stroke="#d1d5db" />
            <Tooltip />
            <Bar dataKey="precip_mm" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🌬️ Wind Speed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
          Wind Speed (km/h)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="wind_kph"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherCharts;
