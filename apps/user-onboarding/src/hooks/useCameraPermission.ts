import { useCallback, useMemo } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useQuery } from '@tanstack/react-query';
import { Linking } from 'react-native';

function useCameraPermission() {
  const cameraPermissionQuery = useQuery(
    ['cameraPermission'],
    () => Camera.getCameraPermissionStatus(),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const requestCameraPermission = useCallback(async () => {
    if (
      cameraPermissionQuery.fetchStatus === 'idle' ||
      cameraPermissionQuery.isError ||
      cameraPermissionQuery.data === 'not-determined'
    ) {
      const result = await Camera.requestCameraPermission();
      cameraPermissionQuery.refetch();
      return result;
    } else {
      cameraPermissionQuery.refetch();
      Linking.openSettings();
    }
  }, [cameraPermissionQuery]);

  return useMemo(
    () => ({
      cameraPermission: cameraPermissionQuery.data,
      requestCameraPermission,
    }),
    [cameraPermissionQuery, requestCameraPermission]
  );
}

export default useCameraPermission;
