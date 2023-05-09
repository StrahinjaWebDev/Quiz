import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Question } from "../models/Question";
interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getQuestions = async (selectedCard: object | string): Promise<ResponseType<Question[] | Question>> => {
  try {
    const { data, status }: AxiosResponse<Question[]> = await ApiClient.get<Question[]>(`/quizzes/${selectedCard}`);

    const response: ResponseType<Question[]> = { success: true, data };

    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Question[]> = { success: false, error: message };
    return response;
  }
};

export { getQuestions };
