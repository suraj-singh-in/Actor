const baseURL = process.env.NEXT_PUBLIC_SERVICE_BASE_URL;

export const LOGIN_URL = `${baseURL}/auth/login`;
export const GET_USER_DETAILS = `${baseURL}/theater/getAllTheaterByUser`;
