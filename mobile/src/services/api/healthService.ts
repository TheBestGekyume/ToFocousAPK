import { api } from "./api";

type HealthResponse = {
  status: string;
};

export const healthService = {
  async check(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>("/health/");
    return response.data;
  },
};