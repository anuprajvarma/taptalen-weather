import { Link } from "react-router-dom";

const CityCard = ({
  name,
  temp,
  condition,
  icon,
  wind,
  humidity,
}: {
  name: string;
  temp: number;
  condition: string;
  icon: string;
  wind: number;
  humidity: number;
}) => {
  return (
    <Link
      to={`/city/${name}`}
      className="bg-gray-800 p-4 rounded-lg flex gap-4"
    >
      <div className="flex flex-col gap-2">
        <p>{temp}°C</p>
        <p>{name}</p>
      </div>
      <div className="flex flex-col text-end items-end">
        <div className="flex flex-col">
          <p>Humidity: {humidity}</p>
          <p>Wind: {wind}</p>
          <p>Con: {condition}</p>
        </div>
        <img src={icon} alt="conditon icon" />
      </div>
    </Link>
  );
};

export default CityCard;
