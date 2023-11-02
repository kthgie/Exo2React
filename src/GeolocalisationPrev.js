import React, { useState, useEffect } from "react";
import axios from "axios";
import './meteoPrev.css';


const MeteoPrev = () => {
  const [forecastData, setForecastData] = useState(null);
  const zip = 37.5660000;
  const country = 126.9784000;
  const apiKey = "3a797131b6712014f8ac8d68738e22b2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}`
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
}
