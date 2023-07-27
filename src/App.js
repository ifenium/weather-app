import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const WEATHER_API_URL = 'https://api.agromonitoring.com/agro/1.0/weather?lat=35&lon=139&appid=eb025c7215cb416cb758a6f93b00ec8e';
const SOIL_API_URL = 'http://api.agromonitoring.com/agro/1.0/soil?polyid=64802a49b1c3f48b495e1450&appid=eb025c7215cb416cb758a6f93b00ec8e';
const UVI_API_URL = 'http://api.agromonitoring.com/agro/1.0/uvi?polyid=64802a49b1c3f48b495e1450&appid=eb025c7215cb416cb758a6f93b00ec8e';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [uviData, setUviData] = useState(null);

  useEffect(() => {
    // Fetch weather data from the API when the component mounts
    axios.get(WEATHER_API_URL)
      .then(response => {
        // Convert temperature from Kelvin to Celsius
        const tempInCelsius = response.data.main.temp - 273.15;
        setWeatherData({ ...response.data, main: { ...response.data.main, temp: tempInCelsius } });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });

    // Fetch soil data from the API when the component mounts
    axios.get(SOIL_API_URL)
      .then(response => {
        // Remove the PH value from the response
        const { ph, ...rest } = response.data;
        setSoilData(rest);
      })
      .catch(error => {
        console.error('Error fetching soil data:', error);
      });

    // Fetch UVI data from the API when the component mounts
    axios.get(UVI_API_URL)
      .then(response => {
        // Remove the date value from the response
        const { date, ...rest } = response.data;
        setUviData(rest);
      })
      .catch(error => {
        console.error('Error fetching UVI data:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="card">
        <h1>Weather Information</h1>
        {weatherData ? (
          <div>
            <p className="weather-info">Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
            <p className="weather-info">Humidity: {weatherData.main.humidity}%</p>
            <p className="weather-info">Pressure: {weatherData.main.pressure} hPa</p>
            <p className="weather-info">Weather Description: {weatherData.weather[0].description}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>

      <div className="card">
        <h1>Soil Information</h1>
        {soilData ? (
          <div>
            <p className="soil-info">Temperature: {soilData.temp}°C</p>
            <p className="soil-info">Moisture: {soilData.moisture}%</p>
            <p className="soil-info">EC (Electrical Conductivity): {soilData.ec} dS/m</p>
          </div>
        ) : (
          <p>Loading soil data...</p>
        )}
      </div>

      <div className="card">
        <h1>UV Index</h1>
        {uviData ? (
          <div>
            <p className="uvi-info">UV Index: {uviData.uvi}</p>
          </div>
        ) : (
          <p>Loading UV Index data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
