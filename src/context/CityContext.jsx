import React, { createContext, useState } from 'react';

// Create the context
export const CityContext = createContext();

// Create a provider component
export const CityProvider = ({ children }) => {
  // State to hold city name, lat, and long
  const [cityData, setCityData] = useState({
    name: 'Tokyo',  // Default city name
    lat: 35.6895,   // Default latitude
    lon: 139.6917,  // Default longitude
    sunrise:0,
    sunset:0,
    rain: 0,

  });

  const updateHighlight = ( rain) => {
    setCityData( {
      ...cityData,

      rain,

    });
  }


  // Function to update city data
  const updateCity = (name, lat, lon, sunrise, sunset) => {

    setCityData({
      ...cityData,
      name,
      lat,
      lon,
      sunrise,
      sunset
    });
  };


  
  return (
    <CityContext.Provider value={{ cityData, updateCity, updateHighlight }}>
      {children}
    </CityContext.Provider>
  );
};
