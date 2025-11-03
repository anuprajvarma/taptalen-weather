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
    wind_dir: string;
  }[];
}

const WeatherCharts = ({ hourlyData }: ChartProps) => {
  const { unit } = useTempUnit();

  return (
    <div className="space-y-10 py-6">
      {/* 🌡️ Temperature Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
          Temperature Trend ({unit === "C" ? "°C" : "°F"})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tw-prose-body, #1f2937)",
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
        {hourlyData?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="time" stroke="#d1d5db" />
              <YAxis stroke="#d1d5db" />
              <Tooltip />
              <Bar dataKey="precip_mm" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400 text-center">
            No precipitation data available
          </p>
        )}
      </div>

      {/* 🌬️ Wind Speed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
          Wind Speed (km/h)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
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
