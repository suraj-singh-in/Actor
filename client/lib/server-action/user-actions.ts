"use server";

import { GET_USER_LIST } from "../apiURls";
import axiosInstance from "../axiosMiddleware";

export const getUserList = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.get(GET_USER_LIST, { headers });
    return { result: response.data };
  } catch (error: any) {
    const { response } = error;
    if (response && response["data"] && response.data.errorMessage) {
      return { error: response.data.errorMessage };
    }

    return { error: "Something went wrong" };
  }
};
