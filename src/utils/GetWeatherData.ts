import { API_KEY, BASE_URL, cities } from "../constants/AppConfig";
import type { BookMarksType, WeatherType } from "../type";

const FetchWeatherData = async (): Promise<WeatherType[]> => {
  const BookMarksData = JSON.parse(localStorage.getItem("BookMarks") || "[]");
  const loginStatus = JSON.parse(localStorage.getItem("isLogin") || "false");
  const savemark = BookMarksData.filter(
    (d: BookMarksType) => d.isSave === true
  );
  const pinmark = BookMarksData.filter((d: BookMarksType) => d.isPin === true);
  const citiesData = [...pinmark.slice().reverse(), ...savemark];
  const allCities =
    citiesData.length > 0 ? (loginStatus ? citiesData : cities) : cities;

  const promises = allCities.map((data: BookMarksType) =>
    fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${data.cityName}`).then(
      (res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch weather for ${data.cityName}`);
        return res.json();
      }
    )
  );

  return Promise.all(promises);
};

export default FetchWeatherData;
