import {NativeModules, NativeEventEmitter, Platform} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {store} from '../store';

import BLEStore from './mobx_store';
import {positionBuffer, reportBuffer, voltageBuffer} from './Buffers';

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
  state: string;

  constructor() {
    BleManager.start({showAlert: false});

    this.bleManagerModule = NativeModules.BleManager;
    this.bleManagerEmitter = new NativeEventEmitter(this.bleManagerModule);
    this.device = null;
    this.scanning = false;

    this.stopScanListener = null;
    this.peripheralDiscoverListener = null;
    this.state = 'INIT';
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

  startNotificationAsync = async (id: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        BleManager.startNotification(id, 'ffe0', 'ffe1').then(() => {
          resolve();
        });
      } catch (err) {
        reject(err);
      }

      //작동 함수 별 Buffer 함수 적용하는 Event Listener
      this.bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (data: any) => {
          // console.log(data.value);
          let high, low, left, right, voltage;
          switch (this.state) {
            case 'GET_POSITION':
              [left, right] = positionBuffer(data.value);
              BLEStore.setLeft(left);
              BLEStore.setRight(right);
              break;
            case 'GET_VOLTAGE':
              voltageBuffer(data.value);
              break;
            case 'START_REPORT':
              [high, low, left, right] = reportBuffer(data.value);
              BLEStore.setHigh(high);
              BLEStore.setLow(low);
              BLEStore.setLeft(left);
              BLEStore.setRight(right);
              //console.log(left, right);
              break;
            default:
              break;
          }
        },
      );

      //Buffer 없이 Raw Data 그대로 저장하는 Event Listener
      this.bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        async (data: any) => {
          BLEStore.setRawdata('[ ' + data.value.join(', ') + ' ]');
        },
      );
    });
  };

  startStreaming = async (id: string) => {
    if (id) {
      try {
        await this.startNotificationAsync(id);
      } catch (err) {
        console.error(err);
      }
      // await BleManager.startNotification(id, 'FFE0', 'FFE1')
      //   .then(() => {
      //     console.log('Start Streaming Notification');
      //     this.getPosition();
      //     // this.startReport();
      //   })
      //   .catch(err => {
      //     console.error('Failed to start notification:', err);
      //   });
      // this.bleManagerEmitter.addListener(
      //   'BleManagerDidUpdateValueForCharacteristic',
      //   (data: any) => {
      //     console.log(data.value);
      //     BLEStore.setRawdata('[ ' + data.value.join(', ') + ' ]');
      //     // const [high, low, left, right] = positionBuffer(data.value);
      //     // const [left, right] = positionBuffer(data.value);
      //     // BLEStore.setLeft(left);
      //     // BLEStore.setRight(right);
      //   },
      // );
    }
  };

  stopStreaming = async (id: string) => {
    if (id) {
      BleManager.stopNotification(id, 'ffe0', 'ffe1').then(() => {
        console.log('Stopped Streaming Notification');
      });
    }
  };

  //ble packet functions
  getPosition = async () => {
    this.state = 'GET_POSITION';
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
    this.state = 'GET_VOLTAGE';
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
    this.state = 'START_REPORT';
    console.log('Start Reporting');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x02, 0x41, 0xbf],
      ).catch(err => {
        console.error(err);
      });
    }
  };

  stopReport = async () => {
    this.state = 'STOP_REPORT';
    console.log('Stop Reporting');
    const id = store.getState().ble.connectedDevice?.id;
    if (id) {
      await BleManager.write(
        id,
        'ffe0',
        'ffe1',
        [0xff, 0xff, 0x02, 0x42, 0xbe],
      ).catch(err => {
        console.error(err);
      });
    }
  };

  setWeight = async () => {
    this.state = 'SET_WEIGHT';
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
    this.state = 'SET_RANGE';
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
    this.state = 'CALIBRATE';
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
