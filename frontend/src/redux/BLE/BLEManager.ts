import {NativeModules, NativeEventEmitter, Platform} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {Buffer} from 'buffer';
import {store} from '../store';
import {setBattery, setLeft, setRight} from './slice';

import {observer} from 'mobx-react';
import BLEStore from './mobx_store';
import {positionBuffer} from './positionBuffer';

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
            // console.log(await BleManager.retrieveServices(peripheralID));
            (
              await BleManager.retrieveServices(peripheralID)
            ).characteristics?.forEach(char => {
              console.log(char);
            });
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

  startStreaming = async (id: string) => {
    if (id) {
      BleManager.startNotification(id, 'FFE0', 'FFE1')
        .then(() => {
          console.log('Start Streaming Notification');
          this.getPosition();
          // this.startReport();
        })
        .catch(err => {
          console.error('Failed to start notification:', err);
        });

      this.bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (data: any) => {
          console.log(data.value);
          // const [high, low, left, right] = positionBuffer(data.value);
          const [left, right] = positionBuffer(data.value);
          BLEStore.setLeft(left);
          BLEStore.setRight(right);
          // console.log('New Data', Buffer.from(data.value).toString());
          // store.dispatch(setBattery(Buffer.from(data.value).toString()));
          // if (data.characteristic === '20000000-0000-0000-0000-000000000001')
          //   BLEStore.setLeft(parseFloat(Buffer.from(data.value).toString()));
          // if (data.characteristic === '20000000-0000-0000-0000-000000000002')
          //   BLEStore.setRight(parseFloat(Buffer.from(data.value).toString()));
        },
      );
    }
  };

  stopStreaming = async (id: string) => {
    if (id) {
      BleManager.stopNotification(id, 'ffe0', 'ffe1').then(() => {
        console.log('Stopped Streaming Notification');
      });
      this.bleManagerEmitter.removeListener(
        'BleManagerDidUpdateValueForCharacteristic',
      );
    }
  };

  //ble packet functions
  getPosition = async () => {
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x02, 0x04, 0xfc],
      ).catch(err => {
        console.error(err);
      });
    }
  };

  getVoltage = async () => {
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x02, 0x05, 0xfb],
      ).catch(err => {
        console.error(err);
      });
    }
  };

  startReport = async () => {
    console.log('Start Reporting');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(id, 'ffe0', 'ffe1', [0xff, 0xff, 0x02, 0x41, 0xbf])
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  stopReport = async () => {
    console.log('Stop Reporting');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x02, 0x42, 0xbe],
      ).then(() => {
        this.stopStreaming(id);
      });
    }
  };

  setWeight = async () => {
    console.log('Setting Weight');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x06, 0x61, 0x16, 0x1, 0x16, 0x1],
      ).catch(err => {
        console.error(err);
      });
      //마지막 4개 값은 왼쪽 무게, 왼쪽 하중모드, 오른쪽 무게, 오른쪽 하중모드
    }
  };

  setRange = async () => {
    console.log('Setting Range');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x04, 0x62, 0xff, 0xff],
      ).catch(err => {
        console.error(err);
      });
      //마지막 2개 값은 가동범위 시작, 가동범위 끝
    }
  };

  //명령어 시점 영점 설정
  calibrate = async () => {
    console.log('Calibrate');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x03, 0x63, 0x1],
      ).catch(err => {
        console.error(err);
      });
      //마지막 값은 적용 대상 (1: Left, 2: Right, 3: Both)
    }
  };
}

const manager = new BLEManager();
export default manager;
