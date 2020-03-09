import React, { useState } from "react";
import "./App.css";
import axios from "axios";
let data = {};

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("");
  const [stateName, setState] = useState("");
  const [countryCode, setCountryCode] = useState(0);

  const getCity = () => {
    return axios
      .get("/data/2.5/weather", { params: { q: cityName} })
      .then(res => setWeatherData(res.data));
  };

  return (
    <div className="App" style={{ paddingTop: "200px" }}>
      <input
        onChange={e => {
          let cityName = e.target.value;
          setCityName(cityName);
        }}
        type="text"
      />
      <button onClick={() => {getCity();}}>Search</button>
      <p>{JSON.stringify(weatherData)}</p>
    </div>
  );
}

export default App;
