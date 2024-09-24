import React, { useState, useEffect, useRef, useContext } from 'react';
import Sidebar from './Sidebar';
import WeatherDetails from './WeatherDetails';
import '@fortawesome/fontawesome-free/css/all.css';
import { CityContext } from '../context/CityContext';
import WeekInfo from './WeekSection/WeekInfo';
import HighlightSection from './Todays Highlight/HighlightSection';
import Hamburger from './Hamburger';

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef();
  const [error, setError] = useState(false);
  const { cityData, updateCity } = useContext(CityContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getData = async (city) => {
    try {
      const latlongUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=feab85386e21bf607e19ff3b449d52a5`;
      const latlongRes = await fetch(latlongUrl);
      const latlongData = await latlongRes.json();
  
      if (latlongData.length === 0) throw new Error('City not found');
  
      const { lat, lon } = latlongData[0];
  
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=feab85386e21bf607e19ff3b449d52a5&units=celsius`;
      const res = await fetch(weatherUrl);
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
  
      // Check for null or undefined values before updating context
      const sunrise = data.sys.sunrise || null;
      const sunset = data.sys.sunset || null;
  
      if (sunrise === null || sunset === null) {
        console.warn('Sunrise or sunset data is unavailable.');
      }
  
      setWeatherData(data);
      setError(false);
  
      // Only update city if we have valid values
      updateCity(city, lat, lon, sunrise, sunset);
    } catch (error) {
      console.error(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getData(searchTerm);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    getData('Biratnagar');
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-[#0E1421] min-h-screen overflow-x-hidden ">
    {/* Hamburger Menu */}
    <Hamburger isOpen={isSidebarOpen} toggle={toggleSidebar} />

    {/* Sidebar */}
    <div className={`md:w-20 fixed h-full transition-transform duration-300 ease-in-out z-10 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 md:ml-20">
      {/* Search Section */}
      <div className="p-4 sticky  top-0 z-10 bg-[#0E1421]">
        <div className="w-full lg:max-w-lg ml-16  mx-auto relative">
          <input
            className="bg-[#1A2236] text-gray-300 lg:w-full   h-12 rounded-full pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            placeholder="Search for a city..."
            type="text"
            ref={searchRef}
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      {/* Weather Content */}
      <div className="p-4 md:p-8">
        {error && (
          <p className="text-center text-red-500 mb-4">
            Sorry, we couldn't find that city. Please try again.
          </p>
        )}

        {/* Top Row: Weather Details & Today's Highlights */}
        <div className="grid grid-cols-1 max-h-xl  lg:grid-cols-2 sm:gap-10 gap-32">
          {/* Weather Details Section */}
          <div className="w-full md:pr-10 sm: p-10">
            {weatherData ? (
              <WeatherDetails currentData={weatherData} />
            ) : (
              <p className="text-center text-gray-400">Loading weather data...</p>
            )}
          </div>

          {/* Today's Highlights Section */}
          <div className="w-full md:pr-10 sm: p-10">
            {weatherData ? (
              <HighlightSection weatherDetails={weatherData} />
            ) : (
              <p className="text-gray-400">Loading weather data...</p>
            )}
          </div>
        </div>

        {/* Bottom Row: Weekly Info Section */}
        <div className="w-full h-full md:pr-10 sm: p-10">
        <WeekInfo />
        </div>
      </div>
    </div>
  </div>

  );
}

export default Dashboard;
