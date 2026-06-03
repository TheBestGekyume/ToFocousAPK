import { api, resetAuthState, setAuthToken } from "../api/api";
import { storageService } from "../storage/storageService";

export type LoginUserDTO = {
  email: string;
  password: string;
};

export type SignUpUserDTO = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
};

export const loginUser = async (data: LoginUserDTO): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  await storageService.setAccessToken(response.data.access_token);
  setAuthToken(response.data.access_token);

  if (response.data.refresh_token) {
    await storageService.setRefreshToken(response.data.refresh_token);
  }

  return response.data;
};

export const signUpUser = async (data: SignUpUserDTO): Promise<void> => {
  await api.post("/auth/signup", data);
};

export const logoutUser = async (): Promise<void> => {
  await storageService.clearTokens();
  resetAuthState();
};