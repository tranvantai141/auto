import HelperManager from '@skeleton-app/sdk-managers/helper';

class LoggerManager {
  private shouldShowLogRequest!: boolean;

  private static notShowLogUrl: string[] = ['doctor-slot/search'];

  constructor(shouldShowLogRequest: boolean) {
    this.shouldShowLogRequest = shouldShowLogRequest;
  }

  public static describeSuccessResponse(response: any) {
    const logger = new LoggerManager(true);
    if (!logger.shouldShowLogRequest) {
      return;
    }
    for (const url of this.notShowLogUrl) {
      if ((response.config.url as string).includes(url)) return;
    }
    console.group(
      `%c[${response.config.method.toUpperCase()}---%c${response.status}] %c${
        response.config.url
      }%c`,
      'color: gray',
      'color: #00FFFF',
      'color: #728FCE',
      'color: gray; font-weight: lighter'
    );

    if (!HelperManager.checkInvalidity(response.config.params)) {
      console.groupCollapsed('%c params', 'color: gray');
      console.log(response.config.params);
      console.groupEnd();
    }
    if (!HelperManager.checkInvalidity(response.config.headers)) {
      console.groupCollapsed('%c headers', 'color: gray');
      console.table(response.config.headers);
      console.groupEnd();
    }

    if (!HelperManager.checkInvalidity(response.config.data)) {
      console.groupCollapsed('%c body', 'color: gray');
      console.table(response.config.data);
      console.groupEnd();
    }

    if (!HelperManager.checkInvalidity(response.data)) {
      console.groupCollapsed('%c data', 'color: gray');
      console.log(response.data);
      console.groupEnd();
    }

    console.groupEnd();
  }

  public static describeErrorResponse(error: any) {
    const logger = new LoggerManager(true);
    if (!logger.shouldShowLogRequest) {
      return;
    }
    //-----------------------------------------------------
    console.group(
      '%c Error',
      'color: white; background-color: #D33F49',
      'WEB_SERVICE: RESPONSE'
    );
    if (error.response) {
      const request = error.response.request || error.request || {};
      console.log(`URI: ${error?.config?.url}`);
      console.log(`STATUS: ${error.response.status}`);
      console.log(`METHOD: ${error?.response?.config?.method.toUpperCase()}`);
      //--------------------------------------------
      if (!HelperManager.checkInvalidity(request.headers)) {
        console.groupCollapsed('HEADERS');
        console.table(request.headers);
        console.groupEnd();
      }
      //------------------------------------------------
      console.groupCollapsed('DATA');
      console.log(error.response);
      console.groupEnd();
      //------------------------------------------------
    } else if (!HelperManager.checkInvalidity(error.request)) {
      console.log(`URI: ${error.config?.url}`);
      //--------------------------------------------
      console.groupCollapsed('REQUEST');
      console.log(error.request);
      console.groupEnd();
    } else {
      console.log(`UNKNOWN ERROR: ${error.message}`);
    }
    //------------------------------------------------
    console.groupCollapsed('RESPONSE');
    console.log(error);
    console.groupEnd();
    //------------------------------------------------
    //------------------------------------------------
    console.groupCollapsed('CONFIG');
    console.log(error.config);
    console.groupEnd();
    //------------------------------------------------
    console.groupEnd();
  }

  public static LoggerMetaError = (error: any) => {
    return error?.response?.data?.meta;
  };
}

export default LoggerManager;
