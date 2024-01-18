"use server";

import axiosInstance from "@/lib/axiosMiddleware";
import { GET_USER_DETAILS } from "../apiURls";

export const getAllTheaterByUser = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.get(GET_USER_DETAILS, {
      headers,
    });
    return { result: response.data };
  } catch (error: any) {
    const { response } = error;
    if (response && response["data"] && response.data.errorMessage) {
      return { error: response.data.errorMessage };
    }

    return { errorMessage: "Something went wrong" };
  }
};
