import React from "react";

import Weather from "./Weather";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <Weather defaultcity="NewYork" />
        <footer>
          This project was coded by Fathima and is{" "}
          <a href="https://github.com/fathimaanooj/weather-react-app">
            open-sourced on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
