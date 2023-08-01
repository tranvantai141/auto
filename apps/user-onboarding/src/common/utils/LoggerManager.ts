import HelperManager from "./HelperManager";

class LoggerManager {
  public static describeSuccessResponse(response: any) {
    console.group(
      `%c[${response.config.method.toUpperCase()}---%c${response.status}] %c${response.config.url}%c`,
      "color: gray",
      "color: #00FFFF",
      "color: #728FCE",
      "color: gray; font-weight: lighter",
    );

    if (HelperManager.isValid(response.config.params)) {
      console.groupCollapsed("%c params", "color: gray");
      console.log(response.config.params);
      console.groupEnd();
    }
    if (HelperManager.isValid(response.config.headers)) {
      console.groupCollapsed("%c headers", "color: gray");
      console.table(response.config.headers);
      console.groupEnd();
    }

    if (HelperManager.isValid(response.config.data)) {
      console.groupCollapsed("%c body", "color: gray");
      console.table(response.config.data);
      console.groupEnd();
    }

    if (HelperManager.isValid(response.data)) {
      console.groupCollapsed("%c data", "color: gray");
      console.log(response.data);
      console.groupEnd();
    }

    console.groupEnd();
  }

  public static describeErrorResponse(error: any) {
    //-----------------------------------------------------
    console.group("%c Error", "color: white; background-color: #D33F49", "WEB_SERVICE: RESPONSE");
    if (error.response) {
      const request = error.response.request || error.request || {};
      console.log(`URI: ${error?.config?.url}`);
      console.log(`STATUS: ${error.response.status}`);
      console.log(`METHOD: ${error?.response?.config?.method.toUpperCase()}`);
      //--------------------------------------------
      if (HelperManager.isValid(request.headers)) {
        console.groupCollapsed("HEADERS");
        console.table(request.headers);
        console.groupEnd();
      }
      //------------------------------------------------
      console.groupCollapsed("DATA");
      console.log(error.response);
      console.groupEnd();
      //------------------------------------------------
    } else if (HelperManager.isValid(error.request)) {
      console.log(`URI: ${error.config?.url}`);
      //--------------------------------------------
      console.groupCollapsed("REQUEST");
      console.log(error.request);
      console.groupEnd();
    } else {
      console.log(`UNKNOWN ERROR: ${error.message}`);
    }
    //------------------------------------------------
    console.groupCollapsed("RESPONSE");
    console.log(error);
    console.groupEnd();
    //------------------------------------------------
    //------------------------------------------------
    console.groupCollapsed("CONFIG");
    console.log(error.config);
    console.groupEnd();
    //------------------------------------------------
    console.groupEnd();
  }
}

export default LoggerManager;
