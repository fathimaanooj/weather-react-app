import React from "react";
import FormattedDate from "./FormattedDate";
import "./style/Weather.css";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo({ weatherInfo }) {
  const { name, date, description, icon, temperature, wind, humidity } =
    weatherInfo;

  return (
    <div className="WeatherInfo">
      <h1>{name}</h1>
      <ul>
        <li>
          <FormattedDate date={date} />
        </li>
        <li className="text-capitalize">{description}</li>
      </ul>
      <div className="row mt-3">
        <div className="col-6">
          <div className="clear-fix">
            <div className="float-left">
              <WeatherIcon icon={icon} />
            </div>

            <div className="float-left">
              <WeatherTemperature temperature={temperature} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>
              <b>Wind:</b> {wind} km/hr
            </li>
            <li>
              <b>Humidity:</b> {humidity} %
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
