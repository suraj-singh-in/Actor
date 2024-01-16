import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { generateTraceId } from './utils';

// Function to log the request and response
function logRequestAndResponse(requestConfig: AxiosRequestConfig, response: AxiosResponse) {
  console.log('Request:', requestConfig);
}

// Axios instance with request interceptor
const axiosInstance = axios.create();

// Request interceptor to log each request and response
axiosInstance.interceptors.request.use((config: any) => {
  // Attach trace ID to the request headers
  const traceId = generateTraceId();
  config.headers['X-Trace-ID'] = traceId;

  // Log the request (you can modify this to suit your needs)
  console.log(`[Trace ID: ${traceId}] Sending request to ${config.url}`);

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Log the response (you can modify this to suit your needs)
    console.log(`[Trace ID: ${response.config.headers['X-Trace-ID']}] Received response`);

    // Log the request and response
    logRequestAndResponse(response.config, response);

    return response;
  },
  (error) => {
    // Log the error (you can modify this to suit your needs)
    console.error(`[Trace ID: ${error.config.headers['X-Trace-ID']}] Request failed`);

    // Log the request and response if available
    if (error.response) {
      logRequestAndResponse(error.config, error.response);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
