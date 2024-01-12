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
};

/**
 * Defines the route endpoints for the Theater Router.
 * @typedef {Object} TheaterRouteEndPoints
 * @property {string} CREATE_THEATER - The route path for creating a theater.
 */
export const TheaterRouteEndPoints = {
  CREATE_THEATER: "/create",
};
