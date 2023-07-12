import axios from 'axios';

export const serverAxios = axios.create({
  //baseURL: 'http://localhost:4000',
  baseURL: 'http://ec2-13-125-92-213.ap-northeast-2.compute.amazonaws.com:4000',
  //baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});
