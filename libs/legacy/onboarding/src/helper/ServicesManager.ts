import axios, { AxiosError } from "axios";
import LoggerManager from "@src/helper/LoggerManager";
import { CurlHelper } from "./CurlManager";
import { STATUS_CODE_LIST } from "@src/assets";
export class ServicesManager {
  //NOTE: set min res time to avoid unwanted quick response => ugly UI
  private static readonly MIN_RESPONSE_TIME = 500;

  //DEVELOP
  public static _PREFIX = "https:/e-wallet.com";

  public static KEY_CLOAK_SECRET = "e-wallet";

  public static KEY_CLOAK_URL = "e-wallet";

  public static DEFAULT_URL = `${ServicesManager._PREFIX}/api/v1/`;

  public static AUTH_URL = `${ServicesManager.DEFAULT_URL}users/`;

  baseUrl!: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAxiosInstance = (showCurl = false, formData = false) => {
    const instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 1000 * 100,
    });
    // instance.interceptors.request.use(
    //   async (config) => {
    //     const { auth } = store.getState() as TRootState;
    //     const { token } = auth;

    //     const cloneConfig = { ...config };

    //     if (token.access_token && cloneConfig.headers) {
    //       cloneConfig.headers["Content-Type"] = `application/json`;
    //       if (!!formData) {
    //         cloneConfig.headers["Content-Type"] = `multipart/form-data`;
    //       }

    //       cloneConfig.headers.Authorization = `Bearer ${JSON.parse(JSON.stringify(token.access_token.trim()))}`;
    //       cloneConfig.headers.requeststarttime = new Date().getTime();
    //     }

    //     if (showCurl) {
    //       console.log(new CurlHelper(cloneConfig).generateCommand());
    //     }

    //     const condition =
    //       token.access_token &&
    //       new Date().getTime() > new Date(auth.loginMarkTime).getTime() + (token.expires_in * 1000) / 1.2;

    //     if (condition) {
    //       try {
    //         // const newToken = await AuthenticationServices.regainAccessTokenApi(token.refresh_token);
    //         // store.dispatch(AuthActions._loginSuccessAction(newToken));
    //         // store.dispatch(AuthActions._setLoginMarkTimeAction(new Date()));
    //         return cloneConfig;
    //       } catch (error) {
    //         console.log("📢 [ServicesManager.ts:54]", error);
    //         return cloneConfig;
    //       }
    //     }
    //     return cloneConfig;
    //   },
    //   (error) => Promise.reject(error),
    // );

    instance.interceptors.response.use(
      async (response) => {
        await ServicesManager._checkMinimumResponseTime(parseInt(response.request._headers.requeststarttime));
        LoggerManager.describeSuccessResponse(response);
        return response;
      },
      (error: AxiosError) => ServicesManager._responseErrorHandler(error),
    );
    return instance;
  };

  private static _responseErrorHandler = async (error: AxiosError) => {
    if (error?.response?.status === STATUS_CODE_LIST.clientError.unauthorized) {
      // setTimeout(() => {
      //   store.dispatch(AuthActions._logoutAction());
      //   //reset diagnosis state
      // }, 500);
    }
    await this._checkMinimumResponseTime(parseInt(error.request._headers.requeststarttime));
    LoggerManager.describeErrorResponse(error);
    return Promise.reject(error.response);
  };

  private static _checkMinimumResponseTime = (startTime: number) => {
    const totalFetchTime = new Date().getTime() - startTime;
    const isTooFast = totalFetchTime < ServicesManager.MIN_RESPONSE_TIME;
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(true);
        },
        isTooFast ? ServicesManager.MIN_RESPONSE_TIME - totalFetchTime : 0,
      );
    });
  };
}

export default ServicesManager;
