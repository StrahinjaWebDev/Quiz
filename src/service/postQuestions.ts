import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Quiz } from "../models/Quiz";

interface SuccessResponse {
  success: Boolean;
  error?: string;
}

const postQuizzes = async (newQuiz: Quiz): Promise<SuccessResponse> => {
  try {
    const { data, status }: AxiosResponse = await ApiClient.post("/quizzes", newQuiz);

    const response: SuccessResponse = { success: true };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: SuccessResponse = { success: false, error: message };
    return response;
  }
};

export { postQuizzes };
