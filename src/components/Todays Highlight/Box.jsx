import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

function Box({ text, details, animationUrl }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the Lottie animation data for JSON URLs
    if (animationUrl.endsWith('.json')) {
      fetch(animationUrl)
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch((error) => console.error('Error loading animation:', error));
    }
  }, [animationUrl]);

  return (
    <div className="w-40 rounded-3xl m-2 h-auto bg-[#1e232f] shadow-lg text-center transition-transform transform hover:scale-105 hover:bg-[#2c2f35] flex flex-col justify-between p-4">
  <h2 className="text-white text-lg sm:text-xl font-semibold">{text}</h2>

  {/* Conditionally render Lottie animation only if data is available */}
  <div className="w-full flex justify-center">
    {animationData && (
      <Lottie animationData={animationData} loop={true} className="w-16 h-16 sm:w-20 sm:h-20" />
    )}
  </div>

  {/* Display the title and details in a professional way */}
  <div className="text-center mt-2">
    <h2 className="text-gray-300 text-base sm:text-lg">{details}</h2>
  </div>
</div>

  );
}

export default Box;
