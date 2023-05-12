import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Quiz } from "../models/Quiz";

interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const patchActivateQuiz = async (quizId: string, updatedQuiz: Quiz): Promise<ResponseType<Quiz[]>> => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { data, status }: AxiosResponse<Quiz[]> = await ApiClient.patch<Quiz[]>(`/quizzes/activate/${quizId}`, updatedQuiz);
    const response: ResponseType<Quiz[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Quiz[]> = { success: false, error: message };
    return response;
  }
};

export { patchActivateQuiz };
