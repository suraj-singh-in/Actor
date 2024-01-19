"use server";

import axiosInstance from "@/lib/axiosMiddleware";
import {
  CLONE_THEATER,
  GET_THEATER_DETAILS,
  GET_USER_THEATER_LIST,
} from "../apiURls";

export const getAllTheaterByUser = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.get(GET_USER_THEATER_LIST, {
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

export const getTheaterDetails = async ({
  theaterId,
  headers,
}: {
  theaterId: string;
  headers: { Authorization: string | null };
}) => {
  try {
    const response = await axiosInstance.get(GET_THEATER_DETAILS(theaterId), {
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

export const cloneTheater = async ({ payload, headers }: any) => {
  try {
    const response = await axiosInstance.post(CLONE_THEATER, payload, {
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
