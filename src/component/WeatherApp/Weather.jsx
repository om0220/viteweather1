import React, { useState } from 'react';
import cloud_icon from "../images/cloudy_icon.png";
import clear_icon from "../images/clear sky_icon.png";
import search_icon from "../images/search_icon.png";
import drizzle_icon from "../images/drizzel_icon.png";
import humidity_icon from "../images/humidity_icon.png";
import snow_icon from "../images/snow_icon.png";
import wind_icon from "../images/wind-icon.webp";
import rain_icon from "../images/rainy_icon.png";
import theme from "../images/theme.png";
import './Weather.css';

const Weather = () => {
  const API_KEY = "a3419d2aad818f72de419427f14b31cb";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: "",
    location: "",
    humidity: "",
    wind: ""
  });
  const [wicon, setWicon] = useState(cloud_icon);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  const search = async () => {
    if (city.trim() === "") return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    setWeatherData({
      temp: Math.round(data.main.temp),
      location: data.name,
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed)
    });

    const icon = data.weather[0].icon;
    if (["01d", "01n"].includes(icon)) setWicon(clear_icon);
    else if (["02d", "02n"].includes(icon)) setWicon(cloud_icon);
    else if (["03d", "03n", "04d", "04n"].includes(icon)) setWicon(drizzle_icon);
    else if (["09d", "09n", "10d", "10n"].includes(icon)) setWicon(rain_icon);
    else if (["13d", "13n"].includes(icon)) setWicon(snow_icon);
    else setWicon(clear_icon);
  };

  return (
    <>
      <div className="theme-toggle">
        <img src={theme} alt="Toggle Theme" onClick={toggleTheme} />
      </div>

      <div className='container'>
        <div className="top-bar">
          <input
            type="text"
            placeholder='Search City'
            className='cityInput'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="search-icon">
            <img src={search_icon} alt="search" width="78px" onClick={search} />
          </div>
        </div>

        <div className="weather-image">
          <img src={wicon} alt="weather icon" style={{ width: "200px" }} />
        </div>

        <div className="weather-temp">{weatherData.temp ? `${weatherData.temp}°C` : "24°C"}</div>
        <div className="weather-location">{weatherData.location || "London"}</div>

        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="humidity" height="40px" />
            <div className="data">
              <div className="humidity-percent">{weatherData.humidity ? `${weatherData.humidity}%` : "64%"}</div>
              <div className="text">Humidity</div>
            </div>
          </div>

          <div className="element">
            <img src={wind_icon} height="50px" alt="wind speed" />
            <div className="data">
              <div className="wind-rate">{weatherData.wind ? `${weatherData.wind} km/h` : "18 km/h"}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
