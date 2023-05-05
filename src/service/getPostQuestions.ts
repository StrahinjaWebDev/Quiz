import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Quizzes } from "../models/Quizzes";
interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getPostQuizzes = async (): Promise<ResponseType<Quizzes[]>> => {
  try {
    const { data, status }: AxiosResponse<Quizzes[]> = await ApiClient.post<Quizzes[]>("/quizzes");

    const response: ResponseType<Quizzes[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Quizzes[]> = { success: false, error: message };
    return response;
  }
};

export { getPostQuizzes };
