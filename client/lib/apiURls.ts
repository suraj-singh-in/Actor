const baseURL = process.env.NEXT_PUBLIC_SERVICE_BASE_URL;

// auth
export const LOGIN_URL = `${baseURL}/auth/login`;

// theater
export const CREATE_THEATER = `${baseURL}/theater/create`;
export const GET_USER_THEATER_LIST = `${baseURL}/theater/getAllTheaterByUser`;
export const GET_THEATER_DETAILS = (theaterId: string) =>
  `${baseURL}/theater/getTheaterDetails/${theaterId}`;
export const CLONE_THEATER = `${baseURL}/theater/cloneTheater`;

// user
export const GET_USER_LIST = `${baseURL}/user/getUserList`;
