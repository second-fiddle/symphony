/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isArray, isObject, camelCase, mapValues, mapKeys } from 'lodash';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => config;

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const mapKeysDeep = (data, callback) => {
  if (isArray(data)) {
    return data.map((innerData) => mapKeysDeep(innerData, callback));
  }
  if (isObject(data)) {
    return mapValues(mapKeys(data, callback), (val) =>
      mapKeysDeep(val, callback),
    );
  }

  return data;
};

const mapKeysCamelCase = (data) =>
  mapKeysDeep(data, (_value, key) => camelCase(key));

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { data } = response;
  const convertedData = mapKeysCamelCase(data);

  return { ...response, data: convertedData };
};
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);

  return Promise.reject(error);
};

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(onRequest, onRequestError);
apiClient.interceptors.response.use(onResponse, onResponseError);

export default apiClient;
