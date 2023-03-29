import axios from "axios";

const API = "http://127.0.0.1:8004/";

export const http = axios.create({
  baseURL: API,
});
