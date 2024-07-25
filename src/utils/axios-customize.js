import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

instance.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('access_token')}` }
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const handleRefreshToken = async () => {
  const res = await instance.get("/api/v1/auth/refresh")
  if (res && res.data) return res.data.access_token
  else null;
}

// Add a response interceptor

const NO_RETRY_HEADER = 'x-no-retry'
instance.interceptors.response.use(function (response) {
  return response && response.data ? response.data : response;
}, async function (error) {
  // Xử lý refresh token khi gặp lỗi 401 (Unauthorized) và xử lý retry khi có token mới trong trường hợp API trả về mã lỗi 401 tránh loop vô hạn
  if (error.config && error.response && +error.response.status === 401 && !error.config.headers[NO_RETRY_HEADER]) { 
    const access_token = await handleRefreshToken();
    error.config.headers[NO_RETRY_HEADER] = 'true'
    if (access_token) {
      // Gán lại token mới vào headers của yêu cầu ban đầu
      error.config.headers['Authorization'] = `Bearer ${access_token}`;
      localStorage.setItem('access_token', access_token);
      // Thực hiện lại yêu cầu ban đầu với token mới
      return instance.request(error.config);
    }
  }

  return error?.response?.data ?? Promise.reject(error)
});


export default instance