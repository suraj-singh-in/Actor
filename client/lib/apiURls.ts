const baseURL = process.env.NEXT_PUBLIC_SERVICE_BASE_URL;

// auth
export const LOGIN_URL = `${baseURL}/auth/login`;

// theater
export const CREATE_THEATER = `${baseURL}/theater/create`;
export const GET_USER_THEATER_LIST = `${baseURL}/theater/getAllTheaterByUser`;
export const GET_THEATER_DETAILS = (theaterId: string) =>
  `${baseURL}/theater/getTheaterDetails/${theaterId}`;
export const CLONE_THEATER = `${baseURL}/theater/cloneTheater`;

// acts
export const CREATE_ACT = `${baseURL}/acts/create`;
export const EDIT_ACT = `${baseURL}/acts/edit`;

// user
export const GET_USER_LIST = `${baseURL}/user/getUserList`;

// verse
export const CHANGE_ACTIVE_VERSE = `${baseURL}/acts/changeActiveVerse`;

// permissions
export const GET_ALL_PERMISSIONS = `${baseURL}/permission/getAll`;

// role
export const CREATE_ROLE = `${baseURL}/role/create`;
export const EDIT_ROLE = `${baseURL}/role/edit`;
export const GET_ALL_ROLES = `${baseURL}/role/getAll`;
