import {createAsyncThunk, createListenerMiddleware} from '@reduxjs/toolkit';
import {
  setDevice,
  setConnectedDevice,
  startScanning,
  startListening,
  stopScanning,
} from './slice';
import BLEManager, {DeviceReference} from './BLEManager';
import {store} from '../store';

export const bleMiddleware = createListenerMiddleware();

export const connectToDevice = createAsyncThunk(
  'bleThunk/connectToDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      await BLEManager.connectToPeripherals(ref.id);
      thunkApi.dispatch(setConnectedDevice(ref));
      BLEManager.stopScanningForPeripherals();
    }
  },
);

export const disconnectToDevice = createAsyncThunk(
  'bleThunk/disconnectToDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      console.log(ref.id);
      await BLEManager.disconnectToPeripherals(ref.id);
      thunkApi.dispatch(setConnectedDevice(null));
    }
  },
);

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
