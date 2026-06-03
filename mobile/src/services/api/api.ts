import axios from "axios";
import { storageService } from "../storage/storageService";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("EXPO_PUBLIC_API_URL não foi definida.");
}

export const api = axios.create({
  baseURL: apiUrl,
});

export const setAuthToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const resetAuthState = (): void => {
  delete api.defaults.headers.common.Authorization;
};

api.interceptors.request.use(async (config) => {
  const token = await storageService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});