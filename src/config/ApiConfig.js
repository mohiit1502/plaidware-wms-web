import apisauce from 'apisauce';
import LOGGER from 'services/Logger';
import APP_ENV from './AppEnvironment';

// Create apisauce Instance
const getApiInstance = (baseURL) =>
  apisauce.create({
    baseURL,
    timeout: 30000,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
  });

// Multiple instance based on authentication requirement
const protectedApiClient = (baseURL) => getApiInstance(baseURL);
const apiClient = (baseURL) => getApiInstance(baseURL);

/**
 * Use AuthorizedAPI when Authorization token required for the API request
 * Use UnauthorizedAPI when Authorization token NOT required for the API request
 */
const AuthorizedAPI = protectedApiClient(APP_ENV.BASE_URL);
const UnauthorizedAPI = apiClient(APP_ENV.BASE_URL);

/**
Monitors are functions you can attach to the API which will be called when any request is made. You can use it to do things like:

=> check for headers and record values
=> determine if you need to trigger other parts of your code
=> measure performance of API calls
=> perform logging
=> Monitors are run just before the promise is resolved.
=> You get an early sneak peak at what will come back.

You cannot change anything, just look.
 */

const APIMonitor = (response) => {
  LOGGER.info(`API MONITOR: ${response?.config?.url}`, response);
};

AuthorizedAPI.addMonitor(APIMonitor);
UnauthorizedAPI.addMonitor(APIMonitor);

// Mutate request object in here to change header about the request.
AuthorizedAPI.addAsyncRequestTransform(async (request) => {
  LOGGER.log('request', request);
  let token = localStorage.getItem('token');
  request.headers.Authorization = token;
});

export { AuthorizedAPI, UnauthorizedAPI };
