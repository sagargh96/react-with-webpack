import axios from 'axios';
import { config } from 'utils/Config';

let axiosInstance = axios.create({
    baseURL: config.serverUrl,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    config => {
        if (localStorage.getItem("authToken")) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem("authToken");
        }
        return config;
    }
);

export default axiosInstance;