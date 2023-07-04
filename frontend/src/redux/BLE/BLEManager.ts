import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import {setConnectedDevice} from './slice';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export interface DeviceReference {
  name?: string | null;
  id?: string | null;
}

class BLEManager {
  bleManager: BleManager;
  device: Device | null;
  isListening = false;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;
  }

  scanForPeripherals = (
    onDeviceFound: (deviceSummary: DeviceReference) => void,
  ) => {
    this.bleManager.startDeviceScan(null, null, (_, scannedDevice) => {
      onDeviceFound({
        id: scannedDevice?.id,
        name: scannedDevice?.localName ?? scannedDevice?.name,
      });
    });
  };

  stopScanningForPeripherals = () => {
    this.bleManager.stopDeviceScan();
  };

  connectToPeripherals = async (identifier: string) => {
    this.device = await this.bleManager.connectToDevice(identifier);
    setConnectedDevice(this.device);
    console.log(this.device.name);
    await this.device?.discoverAllServicesAndCharacteristics();
  };

  disconnectPeripherals = async () => {
    await this.device?.cancelConnection();
    setConnectedDevice(null);
  };
}

const manager = new BLEManager();
export default manager;
