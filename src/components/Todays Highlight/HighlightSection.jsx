import React, { useContext } from 'react';
import Box from './Box';
import { CityContext } from '../../context/CityContext';

function HighlightSection({ weatherDetails }) {
  const context = useContext(CityContext);
  const data = context.cityData.rain;
  const types = [
    { name: 'Rain Status', data: `🌧️ Chance of Rain: ${data * 100}%`, animationUrl: 'https://lottie.host/cbb29d97-c06c-4f7a-b7e3-abf5692a7708/TqLS7WqPct.json' },
    { name: 'Wind Status', data: `Wind Speed: ${weatherDetails.wind.speed} m/s`, animationUrl: 'https://lottie.host/76c85385-6c3c-4b58-afdd-153c000d99d1/4kfLZw0ZFW.json' },
    { name: 'Humidity', data: `${weatherDetails.main.humidity}%`, animationUrl: 'https://lottie.host/dfbcfc3d-f733-43b4-8f29-71742abe1ef0/XlkBvl842E.json' },
    { name: 'UV Index', data: `0`, animationUrl: 'https://lottie.host/d64aae11-9826-42a4-8519-8e751a93f24e/ey8pwDj4kr.json' },
  ];

  return (
    <div className="w-full max-w-6xl md:max-w-3xl sm:max-w-xl h-auto p-4 sm:p-6 md:p-8 lg:p-10 m-4 sm:m-6 md:m-8 lg:m-10 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 rounded-3xl shadow-2xl text-white">
      <h1 className='p-4 text-center font-sans font-semibold text-white text-2xl sm:text-3xl'>Today's Highlights</h1>
      
      <div className='grid lg:ml-16 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 justify-center'>
        {types.map((type, index) => (
          <Box key={index} text={type.name} details={type.data} animationUrl={type.animationUrl} />
        ))}
      </div>
    </div>
  );
}

export default HighlightSection;
