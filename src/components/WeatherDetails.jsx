import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

function WeatherDetails({ currentData }) {
  const [isCelsius, setIsCelsius] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  const animationUrl = 'https://lottie.host/764ef668-d0ed-48c0-b845-b450053611b3/gNyVs6vOA4.json';

  const toggleCF = () => {
    setIsCelsius(!isCelsius);
  };

  useEffect(() => {
    if (animationUrl) {
      fetch(animationUrl)
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => console.error('Error loading Lottie animation:', error));
    }
  }, [animationUrl]);

  const getTemperature = (kelvin) => {
    return isCelsius ? (kelvin - 273.15).toFixed(1) : ((kelvin - 273.15) * 9 / 5 + 32).toFixed(1);
  };

  const temperature = currentData ? getTemperature(currentData.main.temp) : '--';
  const max_temperature = currentData ? getTemperature(currentData.main.temp_max) : '--';
  const min_temperature = currentData ? getTemperature(currentData.main.temp_min) : '--';
  const feels_like = currentData ? getTemperature(currentData.main.feels_like) : '--';
  const weather_description = currentData?.weather?.[0]?.description || 'No data available';

  return (
    <div className="w-full max-w-6xl md:max-w-3xl sm:max-w-xl h-auto sm:p-10 md:p-14 lg:p-12 m-4 sm:m-6 md:m-8 lg:m-10 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 rounded-3xl shadow-2xl text-white">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <span className="bg-purple-600 px-8 py-3 rounded-full text-lg sm:text-xl font-semibold shadow-md">Nepal</span>
        <div className="flex items-center space-x-4">
          <span
            onClick={toggleCF}
            className={`cursor-pointer px-4 py-2 rounded-full ${
              !isCelsius ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-900'
            } hover:bg-indigo-700 transition-colors duration-300`}
          >
            F
          </span>
          <span
            onClick={toggleCF}
            className={`cursor-pointer px-4 py-2 rounded-full ${
              isCelsius ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-900'
            } hover:bg-indigo-700 transition-colors duration-300`}
          >
            C
          </span>
        </div>
      </div>

      {/* Weather Content */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {/* Temperature and Location */}
        <div className="space-y-16 text-center md:text-left">
          {currentData ? (
            <>
              <h1 className="text-4xl pt-4 sm:text-5xl md:text-6xl font-bold">{currentData.name}</h1>
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-extrabold">
                {temperature}
                <span className="text-3xl sm:text-4xl ml-2">{isCelsius ? '°C' : '°F'}</span>
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-lg">
                  High: {max_temperature}°{isCelsius ? 'C' : 'F'}
                </span>
                <span className="text-lg">
                  Low: {min_temperature}°{isCelsius ? 'C' : 'F'}
                </span>
              </h3>
            </>
          ) : (
            <h1 className="text-4xl sm:text-5xl">Loading...</h1>
          )}
        </div>

        {/* Lottie Animation */}
        <div className="flex justify-center items-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
          <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-auto">
            {animationData ? <Lottie animationData={animationData} loop={true} /> : null}
          </div>
        </div>

        {/* Weather Description */}
        {currentData && (
          <div className="flex pt-10 flex-col items-center text-center min-h-[250px] sm:min-h-[300px]  md:min-h-[350px]">
            <img
              src="https://img.icons8.com/emoji/96/sun-emoji.png"
              alt={weather_description}
              className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 shadow-xl rounded-full mb-5 sm:mb-6"
            />
            <h2 className="text-2xl pt-6 sm:text-3xl md:text-4xl font-semibold capitalize">{weather_description}</h2>
            <p className="text-xl pt-4 sm:text-2xl mt-4">
              Feels like: {feels_like}°{isCelsius ? 'C' : 'F'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherDetails;
