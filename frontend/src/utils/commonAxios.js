import axios from 'axios';

export const serverAxios = axios.create({
  //baseURL: 'http://localhost:4000',
  baseURL: 'http://ec2-18-119-142-5.us-east-2.compute.amazonaws.com:4000',
  //baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});
