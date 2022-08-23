import axios from 'axios';

axios.defaults.withCredentials = true

const careManagerApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/care-managers',
})

const keyPersonApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/key-persons',
})

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

export {
  careManagerApi,
  keyPersonApi,
  api
};


