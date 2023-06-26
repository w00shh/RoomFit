import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: 'http://localhost:4000',
  //baseURL: `${process.env.REACT_NATIVE_APP_API_ENDPOINT}`,
});
