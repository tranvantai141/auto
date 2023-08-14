import React from "react";

const usePreviousRef = <T>(value: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousRef;
