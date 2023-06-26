import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: `${process.env.REACT_NATIVE_APP_API_ENDPOINT}`,
});
