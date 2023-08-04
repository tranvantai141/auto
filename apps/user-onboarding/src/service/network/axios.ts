import axios from 'axios';
import { DeviceEventEmitter } from 'react-native';
import Config from 'react-native-config';
import { getData, getObject, storeData, storeObject } from 'src/asyncstorage';
import { apiErrorCodes } from 'src/common/utils/Errors';
import { AuthenticationData } from 'src/typings/global';
import NavigationManager from '../../common/utils/NavigationManager';

const REFRESH_ENDPOINT = Config.BASE_URL + '/token/refresh';
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: null | string = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

async function refreshToken(refreshToken: string): Promise<AuthenticationData> {
  const response = await axios.post<AuthenticationData>(REFRESH_ENDPOINT, {
    refresh_token: refreshToken,
  });
  return response.data;
}

const axiosTokenInstance = axios.create({
  baseURL: Config.BASE_URL,
});
axiosTokenInstance.defaults.timeout = 45 * 1000;

axiosTokenInstance.interceptors.request.use(
  async (config) => {
    const token = await getData('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosTokenInstance.interceptors.response.use(
  // Your response success handler
  (response: any) => {

    if (response?.data?.exception?.code === '408') {
      throw {
        data: response?.data?.exception?.message ?? 'Request Timeout',
        status: 408,
      };

    } else if (response?.data?.DATA?.errorCode === '408') {
      throw {
        data: response?.data?.DATA?.errorMessage ?? 'Request Timeout',
        status: 408,
      };
    } else if (response?.data?.DATA?.errorCode === '500') {
      throw {
        data: response?.data?.DATA?.errorMessage ?? 'Bad Request',
        status: 408,
      };
    } else if (response?.data?.errorCode === '500') {
      throw {
        data: response?.data?.errorMessage ?? 'Bad Request',
        status: 408,
      };
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (error.response?.data?.code === apiErrorCodes.ERR_USER_ROLE_CHANGED) {
        DeviceEventEmitter.emit('AuthorizationExpired', 'ERR_USER_ROLE_CHANGED');
      } else {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return axiosTokenInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          const storedTokenData: AuthenticationData | null = await getObject('AUTHENTICATION_DATA');
          if (storedTokenData) {
            return refreshToken(storedTokenData.refresh_token)
              .then(async (newTokenData) => {
                await storeData('ACCESS_TOKEN', newTokenData.access_token);
                await storeObject('AUTHENTICATION_DATA', newTokenData);
                axios.defaults.headers.Authorization = `Bearer ${newTokenData.access_token}`;
                originalRequest.headers['Authorization'] = 'Bearer ' + newTokenData.access_token;
                processQueue(null, newTokenData.access_token);
                isRefreshing = false;
                return axiosTokenInstance(originalRequest);
              })
              .catch((err) => {
                processQueue(err, null);
                isRefreshing = false;
                NavigationManager.navigate('signIn');
                return Promise.reject(err);
              });
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosTokenInstance;
