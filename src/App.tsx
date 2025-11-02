import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityForecast from "./pages/CityForecast";
import Favorite from "./pages/Favorite";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full h-full text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/city/:cityName" element={<CityForecast />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
