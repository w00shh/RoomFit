import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const checkBluetoothPermissions = async () => {
  try {
    const permissionStatus = await checkBluetoothPermission();
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Bluetooth permissions already granted');
      return true;
    } else {
      return requestBluetoothPermissions();
    }
  } catch (error) {
    console.log('Error checking Bluetooth permissions:', error);
  }
};

const checkBluetoothPermission = async () => {
  let permission;
  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL;
  }
  return check(permission);
};

const requestBluetoothPermissions = async () => {
  let permissions;
  if (Platform.OS === 'android') {
    const apiLevel = Platform.Version;
    console.log(apiLevel);
    if (apiLevel < 31) permissions = [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
    else
      permissions = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      ];
  } else if (Platform.OS === 'ios') {
    permissions = [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL];
  }
  try {
    const results = await requestMultiplePermissions(permissions);
    console.log('Bluetooth permissions granted:', results);
    return true;
  } catch (error) {
    console.log('Error requesting Bluetooth permissions:', error);
    return false;
  }
};

const requestMultiplePermissions = async permissions => {
  const results = {};
  for (const permission of permissions) {
    try {
      const result = await request(permission);
      results[permission] = result;
    } catch (error) {
      console.log(`Error requesting permission ${permission}:`, error);
    }
  }
  return results;
};
