import ApiClient from "../hooks/globalFetch";
import { AxiosResponse, AxiosError } from "axios";
import { Invite } from "../models/Invite";

interface ResponseType<T> {
  success: Boolean;
  data?: T;
  error?: string;
}

const getInvites = async (inviteId: string): Promise<ResponseType<Invite[]>> => {
  try {
    const { data, status }: AxiosResponse<Invite[]> = await ApiClient.get<Invite[]>(`/invites/invited/${inviteId}`);

    const response: ResponseType<Invite[]> = { success: true, data };
    return response;
  } catch (error) {
    const { message } = error as AxiosError;
    const response: ResponseType<Invite[]> = { success: false, error: message };
    return response;
  }
};

export { getInvites };
