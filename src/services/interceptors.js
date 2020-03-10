import axios from "axios"
require('dotenv').config();
console.log(process.env);

const ctr_args = {
    baseURL: "http://api.openweathermap.org",
  };

const ax = axios.create(ctr_args);

ax.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params = {...config.params, appid: process.env.REACT_APP_API_KEY};
    return config;
});

export default ax;