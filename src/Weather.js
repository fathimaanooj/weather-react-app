import React, { useEffect, useState } from "react";

import WeatherInfo from "./WeatherInfo";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("colombo");

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }
  function search() {
    const apiKey = "f79c79fdb0dfd761d6485bc96743fedf";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function getWeatherForCity() {
    const apiKey = "f79c79fdb0dfd761d6485bc96743fedf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return axios.get(url);
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await getWeatherForCity();

      const weatherInfo = {};
      weatherInfo.temp = data.main.temp;
      weatherInfo.humidity = data.main.humidity;
      weatherInfo.date = new Date();
      weatherInfo.windSpeed = data.wind.speed;
      weatherInfo.description = data.weather[0].description;

      setWeatherData(weatherInfo);
    }
    fetchData();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Type a city"
              className="from-control"
              autofocus="on"
              onChange={handleCityChange}
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w=100"
            />
          </div>
        </div>
      </form>
      <WeatherInfo data={weatherData} />
    </div>
  );
}
