import {NativeModules, NativeEventEmitter, Platform} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {setConnectedDevice} from './slice';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export interface DeviceReference {
  name?: string | null;
  id?: string | null;
}

class BLEManager {
  bleManagerModule: any;
  bleManagerEmitter: any;
  device: Peripheral | null;
  scanning: boolean;

  stopScanListener: any;
  peripheralDiscoverListener: any;
  onDisconnectListener: any;
  connectTimeout: any;

  constructor() {
    BleManager.start({showAlert: false});

    this.bleManagerModule = NativeModules.BleManager;
    this.bleManagerEmitter = new NativeEventEmitter(this.bleManagerModule);
    this.device = null;
    this.scanning = false;
  }

  scanForPeripherals = (
    onPeripheralFound: (peripheral: Peripheral | null) => void,
  ) => {
    if (!this.scanning) {
      BleManager.scan([], 15, true).then(() => {
        console.log('Scanning...');
        this.scanning = true;
      });
      this.peripheralDiscoverListener = this.bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        onPeripheralFound,
      );

      this.stopScanListener = this.bleManagerEmitter.addListener(
        'BleManagerStopScan',
        () => {
          onPeripheralFound(null);
        },
      );
      return;
    }
  };

  connectToPeripheral = async (peripheralID: string) => {
    try {
      await new Promise(async (resolve, reject) => {
        this.connectTimeout = setTimeout(reject, 3000);

        console.log('Connecting to', peripheralID);

        try {
          await BleManager.connect(peripheralID);
          await BleManager.retrieveServices(peripheralID);
        } catch (err) {
          reject();
        }

        if (this.connectTimeout) {
          clearTimeout(this.connectTimeout);

          this.connectTimeout = null;

          this.onDisconnectListener = this.bleManagerEmitter.addListener(
            'BleManagerDisconnectPeripheral',
            this.onDisconnectPeripheral,
          );

          // resolve();
        }
      });
    } catch (err) {
      clearTimeout(this.connectTimeout);
      this.connectTimeout = null;
      console.error('Could not connect to device');
      // throw new Error(err);
    }
    return;
  };

  disconnectFromPeripherals = async (peripheralID: string) => {
    await BleManager.disconnect(peripheralID);
  };

  onDisconnectPeripheral = async (peripheralID: string) => {
    console.log(peripheralID, 'disconnected');
    this.onDisconnectListener.remove();
  };

  readBattery = async (peripheralID: string) => {
    if (await BleManager.isPeripheralConnected(peripheralID)) {
      BleManager.read(peripheralID, '180f', '2a19')
        .then(res => {
          return res;
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
}

const manager = new BLEManager();
export default manager;
