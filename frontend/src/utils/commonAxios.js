import axios from 'axios';

export const serverAxios = axios.create({
  //baseURL: 'http://localhost:4000',
  baseURL: 'http://ec2-3-137-163-124.us-east-2.compute.amazonaws.com:4000',
  //baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});
