import React from "react";
import NetInfo from "@react-native-community/netinfo";

const ViewModel = () => {
  const [isConnected, setIsConnected] = React.useState(true);
  const [notConnectedShown, setNotConnectedShown] = React.useState(false);

  const [showBackOnline, setShowBackOnline] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected);
      if (isConnected && notConnectedShown) {
        setShowBackOnline(true);
        setTimeout(() => {
          setShowBackOnline(false);
        }, 3000);
      } else if (!isConnected) {
        setShowBackOnline(false);
        setNotConnectedShown(true);
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
  
  return {
    isConnected,
    showBackOnline,
  };
};

export default ViewModel;
