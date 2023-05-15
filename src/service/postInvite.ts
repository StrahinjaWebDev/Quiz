import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Invite } from "../models/Invite";

interface SuccessResponse {
  success: Boolean;
  error?: string;
}

const postInvite = async (newInvite: Invite): Promise<SuccessResponse> => {
  try {
    const { data, status }: AxiosResponse = await ApiClient.post("/invites", newInvite);

    const response: SuccessResponse = { success: true };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: SuccessResponse = { success: false, error: message };
    return response;
  }
};

export { postInvite };
