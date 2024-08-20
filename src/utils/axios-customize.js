import { Mutex } from "async-mutex";
import axios from "axios";

const mutex = new Mutex();
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

instance.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('access_token')}` }

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem("access_token")) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const handleRefreshToken = async () => {
  // const res = await instance.get("/api/v1/auth/refresh")
  // if (res && res.data) return res.data.access_token
  // else null;

  //request step by step just 1 request refresh token can call
  return await mutex.runExclusive(async () => {
    const res = await instance.get('/api/v1/auth/refresh');
    if (res && res.data) return res.data.access_token;
    else return null;
  });
}

// Add a response interceptor

const NO_RETRY_HEADER = 'x-no-retry'
instance.interceptors.response.use(function (response) {
  return response && response.data ? response.data : response;
}, async function (error) {
  // Xử lý token hết hạn  khi gặp lỗi 401 (Unauthorized) và xử lý refresh_token khi có token mới trong trường hợp API trả về mã lỗi 401 tránh loop vô hạn
  if (error.config && error.response
    && +error.response.status === 401
    && !error.config.headers[NO_RETRY_HEADER]
  ) {
    const access_token = await handleRefreshToken();
    error.config.headers[NO_RETRY_HEADER] = 'true'
    if (access_token) {
      error.config.headers['Authorization'] = `Bearer ${access_token}`;
      localStorage.setItem('access_token', access_token)
      return instance.request(error.config);
    }
  }

  if (
    error.config && error.response && +error.response.status === 400 && error.config.url === '/api/v1/auth/refresh'
  ) {
    //  window.location.href = '/login';
  }



  return error?.response?.data ?? Promise.reject(error)
});


export default instance