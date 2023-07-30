import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const WEATHER_API_URL = 'https://api.agromonitoring.com/agro/1.0/weather?lat=35&lon=139&appid=eb025c7215cb416cb758a6f93b00ec8e';
const SOIL_API_URL = 'http://api.agromonitoring.com/agro/1.0/soil?polyid=64802a49b1c3f48b495e1450&appid=eb025c7215cb416cb758a6f93b00ec8e';
const UVI_API_URL = 'http://api.agromonitoring.com/agro/1.0/uvi?polyid=64802a49b1c3f48b495e1450&appid=eb025c7215cb416cb758a6f93b00ec8e';
const NDVI_API_URL = 'https://samples.agromonitoring.com/agro/1.0/ndvi/history?polyid=64802a49b1c3f48b495e1450&start=1530336000&end=1534976000&appid=eb025c7215cb416cb758a6f93b00ec8e';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [uviData, setUviData] = useState(null);
  const [ndviData, setNdviData] = useState(null);

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

    // Fetch NDVI data from the API when the component mounts
    axios.get(NDVI_API_URL)
      .then(response => {
        setNdviData(response.data);
      })
      .catch(error => {
        console.error('Error fetching NDVI data:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className='card'>
          <h2>Plant Leaf Image Classifier</h2>
          <a href="https://rexsimiloluwah.github.io/PLANT-DISEASE-CLASSIFIER-WEB-APP-TENSORFLOWJS/" className="card-link" target="_blank" rel="noopener noreferrer">
            <img className='upload' src={`${process.env.PUBLIC_URL}/Vector.png`} alt="Upload"/>
          </a>
          <h3>Upload Image</h3>
        </div>
        <div className="card">
          <h2>Weather Data</h2>
          {weatherData ? (
            <div>
              <p className="weather-info">Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
              <p className="weather-info">Humidity: {weatherData.main.humidity}%</p>
              <p className="weather-info">Pressure: {weatherData.main.pressure} hPa</p>
              <p className="weather-info">Weather Description: {weatherData.weather[0].description}</p>
              <p className="uvi-info">UV Index: {uviData.uvi}</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/Logo.png`} alt="Logo" className="logo" />
        </div>
        <div className="card">
          <h2>Soil data</h2>
          {soilData ? (
            <div>
              <p className="soil-info">Temperature at the surface: {(soilData.t0-273).toFixed(2)}°C</p>
              <p className="soil-info">Temperature at the depth of 10 cm: {(soilData.t10-273).toFixed(2)}°C</p>
              <p className="soil-info">Moisture Level(m3/m3): {(soilData.moisture*100).toFixed(2)}%</p>
            </div>
          ) : (
            <p>Loading soil data...</p>
          )}
        </div>
        <div className="card">
          <h2>Historical NDVI Data</h2>
          {ndviData ? (
            <div>
              {ndviData.map((data, index) => (
                <p key={index} className="ndvi-info">
                  Date: {new Date(data.dt * 1000).toLocaleDateString()}, NDVI Value: {data.ndvi.toFixed(2)}
                </p>
              ))}
            </div>
          ) : (
            <p>Loading historical NDVI data...</p>
          )}
        </div>
      </div>
      <div className='Iframe1'>
        <iframe height="400" width='300'src="https://industrial.ubidots.com/app/dashboards/public/widget/vaOSciU2d3k-cE-83PcycLPaDIf0qHXnsvX2soeFE74?embed=true"></iframe>
        <iframe height="400" width="700" src="https://industrial.ubidots.com/app/dashboards/public/widget/cX7sJ8cCAvcLludFGflwj0XRXGtu6UHNK3cWCwK6bYI?embed=true"></iframe>
        <iframe width="100%" height="796" frameborder="0" src="https://industrial.ubidots.com/app/dashboards/public/widget/PaxmCU4WXn3aDdf__kgyHmp_hS29beseUhWjoWgqI18?embed=true"></iframe>
      </div>
    </div>
  );
}

export default App;
