import {NativeModules, NativeEventEmitter, Platform} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {Buffer} from 'buffer';
import {store} from '../store';
import {setBattery} from './slice';

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

    this.stopScanListener = null;
    this.peripheralDiscoverListener = null;
  }

  scanForPeripherals = (
    onPeripheralFound: (peripheral: Peripheral | null) => void,
  ) => {
    BleManager.scan([], 15, false).then(() => {
      this.scanning = true;
      console.log('Scanning...');
    });

    if (this.peripheralDiscoverListener == null)
      this.peripheralDiscoverListener = this.bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        onPeripheralFound,
      );

    if (this.stopScanListener == null)
      this.stopScanListener = this.bleManagerEmitter.addListener(
        'BleManagerStopScan',
        () => {
          console.log('Scanning Stopped');
          this.scanning = false;
          onPeripheralFound(null);
        },
      );
    return;
  };

  connectToPeripheral = async (peripheralID: string) => {
    const connectedID = store.getState().ble.connectedDevice?.id;
    if (connectedID) this.disconnectFromPeripherals(connectedID);

    var res = false;
    try {
      await new Promise<void>(async (resolve, reject) => {
        this.connectTimeout = setTimeout(reject, 3000);

        console.log('Connecting to', peripheralID);

        try {
          await BleManager.connect(peripheralID).then(async () => {
            console.log('Connected to', peripheralID);
            await BleManager.retrieveServices(peripheralID);
          });
        } catch (err) {
          res = false;
          reject();
        }

        if (this.connectTimeout) {
          clearTimeout(this.connectTimeout);
          this.connectTimeout = null;
          res = true;
          resolve();
        }
      });
    } catch (err) {
      clearTimeout(this.connectTimeout);
      this.connectTimeout = null;
      console.error('Could not connect to device');
    }
    return res;
  };

  disconnectFromPeripherals = async (peripheralID: string) => {
    await BleManager.disconnect(peripheralID);
  };

  // stopScan = async () => {
  //   await BleManager.stopScan();
  //   this.peripheralDiscoverListener.remove();
  //   this.stopScanListener.remove();
  // };

  // onDisconnectPeripheral = async (peripheralID: string) => {
  //   console.log(peripheralID, 'disconnected');
  //   this.onDisconnectListener.remove();
  // };

  startStreaming = async () => {
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      BleManager.startNotification(
        id,
        '10000000-0000-0000-0000-000000000001',
        '20000000-0000-0000-0000-000000000001',
      )
        .then(() => {
          console.log('Starting notification...');
        })
        .catch(err => {
          console.error('Failed to start notification:', err);
        });

      this.bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (data: any) => {
          // console.log('New Data', Buffer.from(data.value).toString());
          store.dispatch(setBattery(Buffer.from(data.value).toString()));
          // test(Buffer.from(data.value).toString());
        },
      );
    }
  };

  readBattery = async () => {
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      const battery = await BleManager.read(
        id,
        '10000000-0000-0000-0000-000000000001',
        '20000000-0000-0000-0000-000000000001',
      );
      return Buffer.from(battery).toString();
    }
  };
}

const manager = new BLEManager();
export default manager;
