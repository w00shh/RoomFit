import {createAsyncThunk, createListenerMiddleware} from '@reduxjs/toolkit';
import {
  setDevice,
  setConnectedDevice,
  setBattery,
  startScanning,
  startListening,
  readDeviceBattery,
  stopScanning,
} from './slice';
import BLEManager, {DeviceReference} from './BLEManager';
import {store} from '../store';

export const bleMiddleware = createListenerMiddleware();

export const connectToDevice = createAsyncThunk(
  'bleThunk/connectToDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      const isConnected = await BLEManager.connectToPeripheral(ref.id);
      const onDisconnectListener = BLEManager.bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        () => {
          console.log(ref.id, 'disconnected');
          thunkApi.dispatch(setConnectedDevice(null));
          onDisconnectListener.remove();
        },
      );
      if (isConnected) {
        console.log('Connected Successfully');
        thunkApi.dispatch(setConnectedDevice(ref));
      } else console.log('Failed to connect');
    }
  },
);

export const disconnectFromDevice = createAsyncThunk(
  'bleThunk/disconnectFromDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      BLEManager.disconnectFromPeripherals(ref.id);
      thunkApi.dispatch(setConnectedDevice(null));
      thunkApi.dispatch(setDevice(ref));
    } else {
      console.log('Device Not Found');
    }
  },
);

bleMiddleware.startListening({
  actionCreator: startScanning,
  effect: (_, listenerApi) => {
    store.getState().ble.allDevices = [];
    BLEManager.scanForPeripherals(device => {
      if (device?.name != null) listenerApi.dispatch(setDevice(device));
    });
  },
});

// bleMiddleware.startListening({
//   actionCreator: stopScanning,
//   effect: () => {
//     BLEManager.stopScan();
//   },
// });

bleMiddleware.startListening({
  actionCreator: startListening,
  effect: async (_, listenerApi) => {
    if (store.getState().ble.connectedDevice) {
      await BLEManager.startStreaming();
    }
  },
});

bleMiddleware.startListening({
  actionCreator: readDeviceBattery,
  effect: async (_, listenerApi) => {
    if (store.getState().ble.connectedDevice) {
      await BLEManager.readBattery()
        .then(res => {
          listenerApi.dispatch(setBattery(res!));
        })
        .catch(err => {
          listenerApi.dispatch(setBattery(null));
        });
    }
  },
});
