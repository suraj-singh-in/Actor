const baseURL = process.env.NEXT_PUBLIC_SERVICE_BASE_URL;

export const LOGIN_URL = `${baseURL}/auth/login`;
export const GET_USER_THEATER_LIST = `${baseURL}/theater/getAllTheaterByUser`;
export const GET_THEATER_DETAILS = (theaterId: string) =>
  `${baseURL}/theater/getTheaterDetails/${theaterId}`;
export const CLONE_THEATER = `${baseURL}/theater/cloneTheater`;
