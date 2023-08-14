import axios from "axios";
import queryString from "query-string";
import Configs from '@/configs'
import { getCookie } from 'cookies-next';

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
  // paramsSerializer: params => queryString.stringify(params)
});

// const axiosClient = axios.create({
//   baseURL: `http://localhost:3001`,
//   headers: {
//     'content-type': 'application/json'
//   },
//   paramsSerializer: params => queryString.stringify(params)
// })

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// },
//   (error) => {
//     Promise.reject(error);
//   }
//   // Handle token here ...
// )

axiosClient.interceptors.request.use((config) =>{
  const token = getCookie("token");
  if(token === undefined) {
      config.headers.Authorization = '';
  } else {
      config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log('config.headers.Authorization', config.headers)
  return config
}
  // Handle token here ...
 
)

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data
  }
  return response
}, (error) => {
  // Handle errors
  throw error
})


export default axiosClient;
