import React, { useState, useEffect } from "react";
import axios from "axios";
import './meteoPrev.css';


const MeteoPrev = () => {
  const [forecastData, setForecastData] = useState(null);
  const lat = 37.5660000;
  const lon = 126.9784000;
  const apiKey = "3a797131b6712014f8ac8d68738e22b2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        if (response.status === 200) {
          setForecastData(response.data);
        } else {
          console.error("Une erreur s'est produite");
        }
      } catch (error) {
        console.error("Une erreur a été attrapée lors de l'envoi des données", error);
      }
    };

    fetchData();
  }, [lat, lon, apiKey]);

  const calculateTime = (baseTime, hoursToAdd) => {
    const currentTime = new Date(baseTime);
    currentTime.setHours(currentTime.getHours() + hoursToAdd);
    return currentTime.toLocaleTimeString();
  };
  return (
      <div>
        {forecastData ? (
          <div>
            <h2>Prévision méteo sur 5 jours {forecastData.city.name}</h2>
            <ul>
              {forecastData.list.map((forecast, index) => (
                <li key={forecast.dt}>
              <p>Time: {calculateTime(new Date(), index * 3)} (Toutes les 3 heures)</p>
                  <p>Température minimal: {forecast.main.temp_min}°C</p>
                  <p>Température maximal: {forecast.main.temp_max}°C</p>
                  <p>Description de la méteo: {forecast.weather[0].description}</p>
                  <img
                    src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Chargement des données ...</p>
        )}
      </div>
    );
  };

export default MeteoPrev;
