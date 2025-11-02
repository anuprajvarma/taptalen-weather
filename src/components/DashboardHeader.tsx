import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <div className="w-full flex justify-end p-6 border-b border-gray-800">
      <div className="flex gap-4">
        <div>toggle</div>
        <Link to="/favorite">faviraot</Link>
        <div>dark mode</div>
      </div>
    </div>
  );
};

export default DashboardHeader;
