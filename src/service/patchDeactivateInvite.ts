import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Quiz } from "../models/Quiz";
import { Invite } from "../models/Invite";

interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const patchDeactivateInvite = async (quizId: string, invite: Invite): Promise<ResponseType<Quiz[]>> => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { data, status }: AxiosResponse<Invite[]> = await ApiClient.patch<Invite[]>(`/quizzes/activate/${quizId}`, invite);
    const response: ResponseType<Quiz[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Quiz[]> = { success: false, error: message };
    return response;
  }
};

export { patchDeactivateInvite };
