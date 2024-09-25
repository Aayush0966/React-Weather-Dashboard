import React, { useContext, useState, useEffect } from 'react';
import { CityContext } from '../../context/CityContext';
import DaysBox from './DaysBox';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react'; // Make sure to import your icons

function WeekInfo() {
  const [loading, setLoading] = useState(true);
  const [hourlyData, setHourlyData] = useState([]);
  const context = useContext(CityContext);
  const cityDetails = context.cityData;
  const updateHighlight = context.updateHighlight;
  const [tomorrow, setTomorrow] = useState({});
  const [today, setToday] = useState(true);
  const [dailyData, setDailyData] = useState([]);

  function getSevenDayWeather(forecastList) {
    const dayData = {};

    forecastList.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0]; // Extract the date (e.g., '2024-09-29')

      // If this date is not in the dictionary, initialize an empty array for temperatures and descriptions
      if (!dayData[date]) {
        dayData[date] = {
          temps: [],
          descriptions: [],
        };
      }

      // Add the temperature and description for this time slot to the corresponding day
      dayData[date].temps.push(entry.main.temp);
      dayData[date].descriptions.push(entry.weather[0].description); // Extract the weather description
    });

    // Helper function to format date as "Sept 28"
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options); // Output: "Sept 28"
    };

    // Calculate the average temperature and pick the most frequent description for each day
    const dailyWeather = Object.keys(dayData).map((date) => {
      const temps = dayData[date].temps;
      const descriptions = dayData[date].descriptions;

      // Calculate average temperature
      const averageTemp =
        temps.reduce((acc, temp) => acc + temp, 0) / temps.length;

      // Get the most frequent description (mode)
      const descriptionCounts = descriptions.reduce((counts, desc) => {
        counts[desc] = (counts[desc] || 0) + 1;
        return counts;
      }, {});

      const mostFrequentDescription = Object.keys(descriptionCounts).reduce(
        (a, b) => (descriptionCounts[a] > descriptionCounts[b] ? a : b)
      );

      return {
        day: formatDate(date), // Format the date
        averageTemp: averageTemp.toFixed(2), // Round to two decimal places
        weatherDescription: mostFrequentDescription, // Most common weather description
      };
    });

    setDailyData(dailyWeather);
  }

  const getData = async () => {
    try {
      const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityDetails.lat}&lon=${cityDetails.lon}&appid=YOUR_API_KEY&units=metric`;
      const res = await fetch(hourlyUrl);
      if (!res.ok) throw new Error('Error fetching weather data');

      const data = await res.json();
      const nextFiveHours = data.list.slice(0, 39);

      setHourlyData(nextFiveHours);
      updateHighlight(data.list[0].pop);

      const tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      tomorrowDate.setUTCHours(9, 0, 0, 0);
      const unixTimestamp = Math.floor(tomorrowDate.getTime() / 1000);
      const tomorrowData = nextFiveHours.find((hour) => hour.dt === unixTimestamp);
      setTomorrow(tomorrowData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description) => {
    if (description.includes('clear')) return <Sun className="w-10 h-10 text-yellow-400" />;
    if (description.includes('cloud')) return <Cloud className="w-10 h-10 text-gray-400" />;
    if (description.includes('rain')) return <CloudRain className="w-10 h-10 text-blue-400" />;
    if (description.includes('snow')) return <Snowflake className="w-10 h-10 text-blue-200" />;
    return <Sun className="w-10 h-10 text-yellow-400" />;
  };

  const handleClicked = () => {
    setToday(!today);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (hourlyData.length > 0) {
      getSevenDayWeather(hourlyData);
    }
  }, [hourlyData]);

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 m-4 sm:m-6 md:m-8 lg:m-10 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 rounded-3xl shadow-2xl text-white">
      <div className="flex">
        <button
          onClick={handleClicked}
          className={`p-2 ${today ? 'bg-indigo-700' : ''} font-mono text-white hover:bg-indigo-700 rounded-2xl text-2xl sm:text-3xl text-left`}
        >
          Today
        </button>
        <h2 className="p-2 font-mono text-white text-2xl sm:text-3xl text-left">/</h2>
        <button
          onClick={handleClicked}
          className={`p-2 font-mono ${!today ? 'bg-indigo-700' : ''} text-white hover:bg-indigo-700 rounded-2xl text-2xl sm:text-3xl text-left`}
        >
          Week
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flx flex-col w-full">
          <div className="flex flex-wrap gap-4 mt-5 justify-start">
            {today ? (
              hourlyData.slice(0, 16).map((hour, index) => (
                <DaysBox type="hours" key={index} data={hour} />
              ))
            ) : (
              dailyData.map((day, index) => (
                <DaysBox type="days" key={index} data={day} />
              ))
            )}
          </div>

          <div className="bg-gradient-to-r from-indigo-900 to-[#1e232f] mt-8 sm:mt-12 w-full rounded-3xl shadow-black h-auto p-4 sm:p-5 transition-transform transform hover:scale-105">
            <div className="flex flex-col sm:flex-row justify-between items-center h-full">
              <div className="text-center sm:text-left">
                <h1 className="text-white font-semibold mb-2">Tomorrow</h1>
                <h1 className="text-white text-3xl sm:text-4xl font-bold">
                  {Math.round(tomorrow.main?.temp)}°
                </h1>
              </div>
              <p className="text-gray-200 text-xl sm:text-2xl mt-2 sm:mt-0">
                {tomorrow.weather ? tomorrow.weather[0].description : 'Loading...'}
              </p>
              <div className="flex items-center mt-2 sm:mt-0">
                {tomorrow.weather && getWeatherIcon(tomorrow.weather[0].description)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekInfo;
