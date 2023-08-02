import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: 'http://127.0.0.1:4000',
  // baseURL: 'http://ec2-3-36-196-200.ap-northeast-2.compute.amazonaws.com:4000',
  //baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});
