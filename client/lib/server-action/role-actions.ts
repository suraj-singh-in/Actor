"use server";

import axiosInstance from "@/lib/axiosMiddleware";

import { CREATE_ROLE, GET_ALL_ROLES } from "../apiURls";

export const createRole = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.post(CREATE_ROLE, payload, {
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

export const getAllRoles = async ({ headers }: any) => {
  try {
    const response = await axiosInstance.get(GET_ALL_ROLES, {
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
