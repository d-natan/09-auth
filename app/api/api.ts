import axios from "axios";

const backendURL = "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});