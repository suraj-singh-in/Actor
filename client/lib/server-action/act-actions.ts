"use server";

import axiosInstance from "@/lib/axiosMiddleware";
import { CREATE_ACT } from "../apiURls";

export const createAct = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.post(CREATE_ACT, payload, {
      headers,
    });
    return { result: response.data };
  } catch (error: any) {
    const { response } = error;
    if (response && response["data"] && response.data.errorMessage) {
      return { error: response.data.errorMessage };
    }

    return { error: "Something went wrong" };
  }
};
