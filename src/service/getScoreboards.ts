import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Scoreboard } from "../models/Scoreboard";

interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getScoreboards = async (): Promise<ResponseType<Scoreboard[]>> => {
  try {
    const { data, status }: AxiosResponse<Scoreboard[]> = await ApiClient.get<Scoreboard[]>("/scoreboards");

    const response: ResponseType<Scoreboard[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Scoreboard[]> = { success: false, error: message };
    return response;
  }
};

export { getScoreboards };
