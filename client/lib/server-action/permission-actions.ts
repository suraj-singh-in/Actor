"use server";

import axiosInstance from "@/lib/axiosMiddleware";

import { GET_ALL_PERMISSIONS } from "../apiURls";

export const getAllPermissions = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.get(GET_ALL_PERMISSIONS, {
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
