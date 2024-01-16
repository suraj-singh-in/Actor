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
    console.log("🚀 ~ LoginAction ~ response:", response);
    return { result: response.data };
  } catch (error: any) {
    const { response } = error;
    if (response && response["data"] && response.data.errorMessage) {
      return { error: response.data.errorMessage };
    }

    return { errorMessage: "Something went wrong" };
  }
};
