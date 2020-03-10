import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./App.scss";
import ax from "./services/interceptors.js";
import WeatherData from "./components/WeatherCard/WeatherCard.js";

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
    return ax
      .get("/data/2.5/weather", { params: { q: q } })
      .then(res => {
        setWeatherData(res.data);
        setIsFound(true);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        setIsFound(false);
      });
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
          console.log(weatherData);
        }}
      >
        Search
      </Button>
      {isFound ? (
        <WeatherData
          icon={weatherData.weather[0].icon}
          weather={weatherData.weather[0].main}
          description={weatherData.weather[0].description}
          temperature={weatherData.main.temp}
          pressure={weatherData.main.pressure}
          humidity={weatherData.main.humidity}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default App;
