import axios from "axios";
import queryString from "query-string";
import Configs from '@/configs'

const axiosServer = axios.create({
  baseURL: "http://0.0.0.0:3001/",
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

axiosServer.interceptors.request.use((config) =>{
  console.log(config)
  return config
}
  // Handle token here ...
)

axiosServer.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data
  }
  return response
}, (error) => {
  // Handle errors
  throw error
})


export default axiosServer;
