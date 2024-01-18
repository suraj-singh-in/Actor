/**
 * Defines the route paths for the Master Router.
 * @typedef {Object} MasterRouterRouteMap
 * @property {string} CONFIG_ROUTE - The route path for configuration.
 * @property {string} ACTS_ROUTE - The route path for acts.
 * @property {string} THEATER_ROUTE - The route path for theater.
 */
export const MasterRouterRouteMap = {
  CONFIG_ROUTE: "/configs",
  ACTS_ROUTE: "/acts",
  THEATER_ROUTE: "/theater",
  MOCK_ROUTE: "/actor",
  AUTH_ROUTER: "/auth",
};

export const mockRouteEndpoints = {
  MOCK: "/mock/:projectName/:actRoute(*)",
};

/**
 * Defines the route endpoints for the Acts Router.
 * @typedef {Object} ActsRouteEndpoints
 * @property {string} GET_ALL_ACTS - The route path for retrieving all acts.
 * @property {string} CREATE_ACT - The route path for creating a act.
 */
export const ActsRouteEndpoints = {
  GET_ALL_ACTS: "/getAllActs",
  CREATE_ACT: "/create",
  CHANGE_ACTIVE_VERSE: "/changeActiveVerse",
};

/**
 * Defines the route endpoints for the Theater Router.
 * @typedef {Object} TheaterRouteEndPoints
 * @property {string} CREATE_THEATER - The route path for creating a theater.
 */
export const TheaterRouteEndPoints = {
  CREATE_THEATER: "/create",
  GET_THEATER_DETAILS: "/getTheaterDetails/:theaterId",
  ADD_VIEWER_TO_THEATER: "/addViewer",
  ADD_EDITOR_TO_THEATER: "/addEditor",
  CLONE_THEATER:"/cloneTheater",
  GET_ALL_THEATER_BY_USER:"/getAllTheaterByUser"
};

/**
 * Object containing endpoint paths for authentication-related routes.
 * @typedef {Object} AuthRouterEndPoints
 * @property {string} SIGN_UP - The endpoint path for user registration/sign-up.
 * @property {string} GET_USER_DETAILS - The endpoint path for fetching user details.
 * @property {string} LOGIN - The endpoint path for user login/authentication.
 */
export const AuthRouterEndPoints = {
  SIGN_UP: "/signup",
  GET_USER_DETAILS: "/getUserDetails",
  LOGIN: "/login",
};
