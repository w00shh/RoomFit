import {createAsyncThunk, createListenerMiddleware} from '@reduxjs/toolkit';
import {
  setDevice,
  setConnectedDevice,
  startScanning,
  startListening,
  stopScanning,
  //   connectToDevice,
  disconnectDevice,
} from './slice';
import BLEManager, {DeviceReference} from './BLEManager';
import {store} from '../store';

export const bleMiddleware = createListenerMiddleware();

export const connectToDevice = createAsyncThunk(
  'bleThunk/connectToDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      BLEManager.stopScanningForPeripherals();
      BLEManager.connectToPeripherals(ref.id);
      thunkApi.dispatch(setConnectedDevice(ref));
    }
  },
);

// bleMiddleware.startListening({
//   actionCreator: connectToDevice,
//   effect: (_, listenerApi) => {
//     if (_) {
//       BLEManager.stopScanningForPeripherals();
//       BLEManager.connectToPeripherals(_.id);
//       listenerApi.dispatch(setConnectedDevice(_));
//     }
//   },
// });

bleMiddleware.startListening({
  actionCreator: startScanning,
  effect: (_, listenerApi) => {
    store.getState().ble.allDevices = [];
    BLEManager.scanForPeripherals(device => {
      if (device.name != null) listenerApi.dispatch(setDevice(device));
    });
  },
});

bleMiddleware.startListening({
  actionCreator: stopScanning,
  effect: () => {
    BLEManager.stopScanningForPeripherals();
  },
});

bleMiddleware.startListening({
  actionCreator: disconnectDevice,
  effect: (_, listenerApi) => {
    BLEManager.disconnectPeripherals();
    listenerApi.dispatch(setConnectedDevice(null));
  },
});
