import {createAsyncThunk, createListenerMiddleware} from '@reduxjs/toolkit';
import {
  setDevice,
  setConnectedDevice,
  setBattery,
  startScanning,
  // startListening,
  // stopScanning,
  // connectToDevice,
  // disconnectDevice,
} from './slice';
import BLEManager, {DeviceReference} from './BLEManager';
import {store} from '../store';

export const bleMiddleware = createListenerMiddleware();

export const connectToDevice = createAsyncThunk(
  'bleThunk/connectToDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      BLEManager.connectToPeripheral(ref.id);
      thunkApi.dispatch(setConnectedDevice(ref));
    }
  },
);

export const disconnectFromDevice = createAsyncThunk(
  'bleThunk/disconnectFromDevice',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      BLEManager.disconnectFromPeripherals(ref.id);
      thunkApi.dispatch(setConnectedDevice(null));
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

export const readDeviceBattery = createAsyncThunk(
  'bleThunk/readDeviceBattery',
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      const battery = BLEManager.readBattery(ref.id);
      thunkApi.dispatch(setBattery(battery));
    }
  },
);
