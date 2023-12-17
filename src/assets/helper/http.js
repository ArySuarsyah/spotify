/* eslint-disable no-undef */
import axios from "axios";

const baseURL = process.env.baseURL

const http = (token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    headers,
    baseURL
    // baseURL: "http://localhost:8888",
  });
};

export default http;
