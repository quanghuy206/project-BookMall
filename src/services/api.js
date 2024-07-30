import axios from "../utils/axios-customize"

export const callRegister = (fullName,email,password,phone) => {

   return axios.post('/api/v1/user/register',{fullName,email,password,phone})
}

export const callLogin = (username,password,delay) => {
   return axios.post('/api/v1/auth/login',{username,password,delay})
}

export const callFetchAccount = () => {
   return axios.get('/api/v1/auth/account')
}

export const callFetchLogoutAccount = () => {
   return axios.post('/api/v1/auth/logout')
}
export const callFetchAllUser = (query) => {
   return axios.get(`/api/v1/user?${query}`)
}
export const callFetchAddUser = (fullName,email,password,phone) => {
   return axios.post(`/api/v1/user`,{fullName,email,password,phone})
}
