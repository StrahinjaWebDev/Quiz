import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Questions } from "../models/Questions";
interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getQuestions = async (selectedCard: object): Promise<ResponseType<Questions[]>> => {
  try {
    const { data, status }: AxiosResponse<Questions[]> = await ApiClient.get<Questions[]>(`/quizzes/${selectedCard}`);

    const response: ResponseType<Questions[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Questions[]> = { success: false, error: message };
    return response;
  }
};

export { getQuestions };
