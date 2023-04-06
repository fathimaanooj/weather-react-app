import React from "react";

export default function WeatherTemperature({ temperature }) {
  return (
    <div className="WeatherTemperature">
      <span className="temperature">{Math.round(temperature)}</span>
      <span className="unit">°C</span>
    </div>
  );
}
