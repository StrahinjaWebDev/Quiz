import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Quizzes } from "../models/Quiz";
interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getVisibleQuizzes = async (): Promise<ResponseType<Quizzes[]>> => {
  try {
    const { data, status }: AxiosResponse<Quizzes[]> = await ApiClient.get<Quizzes[]>("/quizzes/visible");

    const response: ResponseType<Quizzes[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Quizzes[]> = { success: false, error: message };
    return response;
  }
};

export { getVisibleQuizzes };
