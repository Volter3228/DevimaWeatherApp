import axios from "axios";

require('dotenv').config();

axios.interceptors.request.use((config) => {
    axios.defaults.baseURL = "http://samples.openweathermap.org"
    config.params['appid'] = process.env.REACT_APP_API_KEY;
    return config;
});

