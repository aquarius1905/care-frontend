import axios from 'axios';
import store from '../store/index.js';

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

//ケアマネージャーログイン時に使用
const careManagerAuthApi = Object.assign({},api);
careManagerAuthApi.interceptors.request.use(config => {
  config.headers = {
    'Authorization': 'Bearer ' + store.getters.getCareManagerAccessToken
  }
  return config;
});

//被介護者ログイン時に使用
const careReceiverAuthApi = Object.assign({},api);
careReceiverAuthApi.interceptors.request.use(config => {
  config.headers = {
    'Authorization': 'Bearer ' + store.getters.getCareReceiverAccessToken
  }
  return config;
});

// 介護事業所ログイン時に使用
const nursingCareOfficeAuthApi = Object.assign({},api);
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