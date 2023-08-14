import React from "react";

export enum ETimeUseInterval {
  default = 1000,
}

const useInterval = (callback: Function, delay = ETimeUseInterval.default) => {
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const intervalFnc = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(intervalFnc);
  }, [delay]);
};

export default useInterval;
