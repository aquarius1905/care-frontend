import axios from 'axios';
import store from '../store/index.js';

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

const careManagerAuthApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

careManagerAuthApi.interceptors.request.use(config => {
  config.headers = {
    'Authorization': 'Bearer ' + store.getters.getCareManagerAccessToken
  }
  return config;
});

const careReceiverAuthApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

careReceiverAuthApi.interceptors.request.use(config => {
  config.headers = {
    'Authorization': 'Bearer ' + store.getters.getCareReceiverAccessToken
  }
  return config;
});

const nursingCareOfficeAuthApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

nursingCareOfficeAuthApi.interceptors.request.use(config => {
  config.headers = {
    'Authorization': 'Bearer ' + store.getters.getNursingCareOfficeAccessToken
  }
  return config;
});
export {
  api,
  careManagerAuthApi,
  careReceiverAuthApi,
  nursingCareOfficeAuthApi
};