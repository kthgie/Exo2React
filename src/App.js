import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const lat = 37.5660000;
  const lon = 126.9784000;
  const apiKey = "3a797131b6712014f8ac8d68738e22b2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (response.status === 200) {
          setWeatherData(response.data);
        } else {
          console.error("Une erreur s'est produite");
        }
      } catch (error) {
        console.error("une erreur est apparu lors du fetch ", error);
      }
    };

    fetchData();
  }, [lat, lon, apiKey]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Météo de {weatherData.name}</h2>
          <p>Température: {(weatherData.main.temp)}°</p>
          <p>Description météo: {weatherData.weather[0].description}</p>
          <img
            src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png"
            alt="Weather Icon"
          />
        </div>
      ) : (
        <p>Chargement des données ...</p>
      )}
    </div>
  );
};

export default WeatherComponent;