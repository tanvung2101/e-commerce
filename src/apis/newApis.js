import axiosClient from "./axiosClient";
import axiosServer from "./axiosServer";

const newsApis = {
    getNews: (params) => axiosClient.get('/api/news', params),
    getDetailNews: (slug) => axiosClient.get(`/api/news/getNewsBySlug/${slug}`),
}
const newsApisServer = {
    getNews: (params) => axiosServer.get('/api/news', params),
    getDetailNews: (slug) => axiosServer.get(`/api/news/getNewsBySlug/${slug}`),
}

export default newsApis
export {newsApisServer}