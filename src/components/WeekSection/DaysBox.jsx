import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

function DaysBox({ data, type }) {
  const [time, setTime] = useState('');
  const [temp, setTemp] = useState(0);
  const [weatherDescription, setWeatherDescription] = useState('');

  const getTime = () => {
    const date = new Date(data.dt * 1000); // Convert from seconds to milliseconds
    const hours = date.getHours(); // Get the hour (24-hour format)
    const actualTime = hours < 12 ? `${hours} AM` : `${hours - 12} PM`;
    setTime(actualTime);
    setTemp(data.main.temp);
    setWeatherDescription(data.weather[0].description);
  };

  const getDays = () => {
    setTime(data.day); // Ensure data.day is a properly formatted string
    setTemp(data.averageTemp);
    setWeatherDescription(data.weatherDescription);
  };

  const getWeatherIcon = () => {
    const description = weatherDescription.toLowerCase(); // Convert to lower case for consistent checking
    if (description.includes('clear')) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (description.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (description.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (description.includes('snow')) return <Snowflake className="w-8 h-8 text-blue-200" />;
    return <Sun className="w-8 h-8 text-yellow-400" />;
  };

  useEffect(() => {
    if (type === 'hours') {
      getTime();
    } else {
      getDays();
    }
  }, [data, type]); // Add dependencies to update when data or type changes

  return (
    <div className='w-20 h-48 bg-gradient-to-b from-slate-800 to-slate-700 shadow-lg rounded-3xl border-gray-700 border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl'>
      <div className='flex flex-col items-center justify-between h-full p-4'>
        <h2 className='text-lg font-semibold'>{time}</h2>
        <div className='my-2'>{getWeatherIcon()}</div>
        <h2 className='text-2xl font-bold'>{Math.round(temp)}°C</h2>
      </div>
    </div>
  );
}

export default DaysBox;
