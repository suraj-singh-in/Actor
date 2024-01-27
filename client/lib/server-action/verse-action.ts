"use server";

import axiosInstance from "@/lib/axiosMiddleware";
import { CHANGE_ACTIVE_VERSE } from "../apiURls";

export const changeActiveVerse = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.post(CHANGE_ACTIVE_VERSE, payload, {
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
