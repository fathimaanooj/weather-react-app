import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style/Weather.css";
import WeatherInfo from "./WeatherInfo";

const API_KEY = "f79c79fdb0dfd761d6485bc96743fedf";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function Weather({ defaultCity }) {
  const [city, setCity] = useState(defaultCity);
  const [loader, setLoader] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);

  function formatData({ name, main, wind, weather, dt }) {
    return {
      name,
      temperature: main.temp,
      humidity: main.humidity,
      date: new Date(dt * 1000),
      wind: wind.speed,
      icon: weather[0].icon,
      description: weather[0].description,
    };
  }

  function getWeatherForCity() {
    let URL = `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    return axios.get(URL);
  }

  useEffect(() => {
    async function fetchWeather() {
      const { data } = await getWeatherForCity();
      const info = formatData(data);
      setWeatherInfo(info);
    }
    fetchWeather();
  }, []);

  async function onClick() {
    setLoader(true);
    const { data } = await getWeatherForCity();
    const info = formatData(data);
    console.log("info:", info);
    setWeatherInfo(info);
    setLoader(false);
  }

  if (!weatherInfo || loader) {
    return <div> Loading ....</div>;
  }

  return (
    <div className="Weather">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Type a city"
              className="from-control"
              autoFocus="on"
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w=100"
              onClick={onClick}
            />
          </div>
        </div>
      </form>
      <WeatherInfo weatherInfo={{ city, ...weatherInfo }} />
    </div>
  );
}
