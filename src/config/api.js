import axios from "axios";

// Change only this value to switch between local and production
//export const API_BASE_URL = "http://localhost:8080";
export const API_BASE_URL = "https://foodingo-api-awasc8h4d7d7cmft.centralindia-01.azurewebsites.net";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
