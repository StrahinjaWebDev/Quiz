import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Quiz } from "../models/Quiz";
interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getQuizById = async (id: string): Promise<ResponseType<Quiz>> => {
  try {
    const { data, status }: AxiosResponse<Quiz> = await ApiClient.get<Quiz>(`/quizzes/${id}`);

    const response: ResponseType<Quiz> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Quiz> = { success: false, error: message };
    return response;
  }
};

export { getQuizById };
