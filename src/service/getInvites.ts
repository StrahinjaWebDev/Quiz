import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Invites } from "../models/Invites";

interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getInvites = async (): Promise<ResponseType<Invites[]>> => {
  try {
    const { data, status }: AxiosResponse<Invites[]> = await ApiClient.get<Invites[]>("/invites");

    const response: ResponseType<Invites[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Invites[]> = { success: false, error: message };
    return response;
  }
};

export { getInvites };
