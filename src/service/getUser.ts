import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { User } from "../models/User";

interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getUsers = async (): Promise<ResponseType<User[]>> => {
  try {
    const { data, status }: AxiosResponse<User[]> = await ApiClient.get<User[]>("/users");

    const response: ResponseType<User[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<User[]> = { success: false, error: message };
    return response;
  }
};

export { getUsers };
