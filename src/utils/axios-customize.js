import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
  });


  // Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log("response",response);
    console.log("response_data",response.data);
    return response && response.data ? response.data : response ;
  }, function (error) {
    console.log(error.response);
    return error?.response?.data ?? Promise.reject(error)
  });


  export default instance