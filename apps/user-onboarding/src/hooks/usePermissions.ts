import { useCallback, useState } from 'react';
import { request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

const usePermission = () => {
  const [isBluetoothPermissionGranted, setIsBluetoothPermissionGranted] = useState<boolean>();

  const requestBluetoothPermission = useCallback((callback: (status: PermissionStatus) => void) => {
    request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL).then((status) => {
      setIsBluetoothPermissionGranted(status === 'granted');
      callback(status);
    });
  }, []);

  return {
    isBluetoothPermissionGranted,
    requestBluetoothPermission,
  };
};

export default usePermission;
