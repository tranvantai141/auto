import UserInactivityPopup from '@components/modals/UserInactivityPopup';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import useCountdown from 'src/hooks/useCountdown';
import { useAppSelector } from 'src/redux/hooks';

const MINUTE_OF_INACTIVITY = 15;

const AppTouchTracking = ({ children }: { children: React.ReactNode }) => {
  const { countdown, reset, pause, resume } = useCountdown(MINUTE_OF_INACTIVITY * 60, {
    startImmediately: false,
  });
  const [showModal, setShowModal] = React.useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.authenticationState);

  useEffect(() => {
    if (isAuthenticated && !showModal) {
      resume();
    } else {
      pause();
      reset();
    }
  }, [isAuthenticated, pause, reset, resume, showModal]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      pause();
      setShowModal(true);
    }
  }, [countdown, pause]);

  return (
    <View
      style={{ flex: 1 }}
      onTouchStart={() => {
        reset();
      }}
    >
      <UserInactivityPopup
        isVisible={showModal}
        modalClose={handleModalClose}
        navigateToLogin={handleModalClose}
      />
      {children}
    </View>
  );
};

export default AppTouchTracking;
