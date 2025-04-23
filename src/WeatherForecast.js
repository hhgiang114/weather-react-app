import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    const data = response.data.list;
    const dailyData = {};

    data.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split("T")[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          date: entry.dt,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          weather: entry.weather[0],
        };
      } else {
        dailyData[date].temp_min = Math.min(
          dailyData[date].temp_min,
          entry.main.temp_min
        );
        dailyData[date].temp_max = Math.max(
          dailyData[date].temp_max,
          entry.main.temp_max
        );
      }
    });

    const forecastArray = Object.values(dailyData).slice(1, 6);
    setForecast(forecastArray);
    setLoaded(true);
  }

  function load() {
    let apiKey = "56dca0e015d9ea5189d0e61c4156b2c0";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();

    return null;
  }
}
