const Footer = () => {
  return (
    <footer className="text-center text-lg py-4 fixed bottom-0 w-full z-30 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-gray-800">
      Use Weather data by{"  "}
      <a
        href="https://www.weatherapi.com/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        WeatherAPI
      </a>
    </footer>
  );
};

export default Footer;
