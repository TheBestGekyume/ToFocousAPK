import { jwtDecode } from "jwt-decode";
import { storageService } from "../services/storage/storageService";

type JwtPayload = {
  exp?: number;
};

export const getTokenExpiration = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp ?? null;
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  const exp = getTokenExpiration(token);

  if (!exp) return false;

  const now = Math.floor(Date.now() / 1000);

  return exp > now;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await storageService.getAccessToken();

  if (!token) return false;

  return isTokenValid(token);
};