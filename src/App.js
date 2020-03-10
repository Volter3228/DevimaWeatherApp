import React, { useReducer } from "react";
import { TextField, Button, Container } from '@material-ui/core';
import "./App.scss";
import ax from "./services/interceptors.js";
import WeatherData from "./components/WeatherCard/WeatherCard.js";
import 'typeface-roboto';

const initialState = {weatherData: {}, cityName: "", countryCode: "", isFound: false};

function reducer(state, action) {
  switch (action.type) {
    case 'setWeatherData':
      return {...state, weatherData: action.weatherData};
    case 'setCityName':
      return {...state, cityName: action.cityName};
    case 'setCountryCode':
      return {...state, countryCode: action.countryCode};    
    case 'setIsFound':
      return {...state, isFound: action.isFound};
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getWeather = () => {
    let q = "";
    if (state.countryCode !== "" && state.cityName !== "") {
      q = [state.cityName, state.countryCode].join();
    } else if (state.cityName !== "") {
      q = state.cityName;
    } else {
      return;
    }
    return ax
      .get("/data/2.5/weather", { params: { q: q } })
      .then(res => {
        dispatch({type: "setWeatherData", weatherData: res.data});
        dispatch({type: "setIsFound", isFound: true});
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        dispatch({type: "setIsFound", isFound: false});
      });
  };

  return (
    <Container className="App bg" style={{ paddingTop: "10px" }}>
      <h1>IS IT RAINY TODAY?</h1>
      <Container style={{marginBottom: "30px"}}>
        <TextField
          className="city-input"
          style={{margin: "20px" }}
          variant="outlined"
          required
          onChange={e => {
            let cityName = e.target.value;
            dispatch({type: "setCityName", cityName: cityName});
          }}
          placeholder="Enter the city..."
          type="text"
        />
        <TextField
        className="city-input"
        variant="outlined"
          style={{ margin: "20px" }}
          onChange={e => {
            let countryCode = e.target.value;
            dispatch({type: "setCountryCode", countryCode: countryCode});
          }}
          type="text"
          placeholder="Enter the country code..."
        />
      </Container>
      <Button
        variant="contained" color="primary"
        style={{backgroundColor: "#510180", marginBottom: "30px", width: "150px"}}
        onClick={() => {
          getWeather();
        }}
      >
        Search
      </Button>
      {state.isFound ? (
        <WeatherData
          icon={state.weatherData.weather[0].icon}
          weather={state.weatherData.weather[0].main}
          description={state.weatherData.weather[0].description}
          temperature={state.weatherData.main.temp}
          pressure={state.weatherData.main.pressure}
          humidity={state.weatherData.main.humidity}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default App;
