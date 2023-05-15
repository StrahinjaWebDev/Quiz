import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Answers } from "../models/Answers";
interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const endQuiz = async (Answers: Answers[]): Promise<ResponseType<Answers[]>> => {
  try {
    const { data, status }: AxiosResponse<Answers[]> = await ApiClient.post<Answers[]>("/quizzes/ended", Answers);

    const response: ResponseType<Answers[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Answers[]> = { success: false, error: message };
    return response;
  }
};

export { endQuiz };
