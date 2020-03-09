import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./App.css";
import axios from "axios";
import WeatherData from './components/WeatherCard/WeatherCard.js';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isFound, setIsFound] = useState(false);

  const getWeather = () => {
    let q = "";
    if (countryCode !== "" && cityName !== "") {
      q = [cityName, countryCode].join();
    } else if (cityName !== "") {
      q = cityName;
    } else {
      return;
    }
    console.log(q);
    return axios.get("/data/2.5/weather", { params: { q: q } }).then(res => {
      setWeatherData(res.data);
      setIsFound(true);
      console.log(res.data);
    }).catch(err => {console.log(err); setIsFound(false)});
  };

  return (
    <Container fluid className="App bg" style={{ paddingTop: "10px" }}>
      <h1>IS IT RAINY TODAY?</h1>
      <Container>
        <input
          required
          style={{ margin: "20px" }}
          onChange={e => {
            let cityName = e.target.value;
            setCityName(cityName);
          }}
          placeholder="Enter the city..."
          type="text"
        />
        <input
          style={{ margin: "20px" }}
          onChange={e => {
            let countryCode = e.target.value;
            setCountryCode(countryCode);
          }}
          type="text"
          placeholder="Enter the country code..."
        />
      </Container>
      <Button
        className="btn"
        onClick={() => {
          getWeather();
        }}
      >
        Search
      </Button>
      {isFound ? (<WeatherData icon={weatherData.icon} />) : (<div>Jopa</div>)}
    </Container>
  );
}

export default App;
