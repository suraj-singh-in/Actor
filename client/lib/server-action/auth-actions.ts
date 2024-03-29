"use server";

import axiosInstance from "@/lib/axiosMiddleware";
import { LOGIN_URL } from "../apiURls";

type loginRequestPayload = {
  userName: string;
  password: string;
};

export const LoginAction = async (payload: loginRequestPayload) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, payload);
    return { result: response.data };
  } catch (error: any) {
    const { response } = error;
    if (response && response["data"] && response.data.errorMessage) {
      return { error: response.data.errorMessage };
    }

    return { error: "Something went wrong" };
  }
};
