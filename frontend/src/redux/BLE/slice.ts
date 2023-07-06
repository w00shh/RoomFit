import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';
import {DeviceReference} from './BLEManager';

interface BLEState {
  allDevices: DeviceReference[];
  connectedDevice: DeviceReference | null;
  battery: number | null | undefined;
}

const initialState: BLEState = {
  allDevices: [],
  connectedDevice: null,
  battery: null,
};

const isDuplicateDevice = (
  devices: DeviceReference[],
  nextDevice: DeviceReference,
) => devices.findIndex(device => nextDevice.id === device.id) > -1;

export type DevicesAction = PayloadAction<DeviceReference>;

export const startScanning = createAction('bleState/startScanning');
export const readDeviceBattery = createAction('bleState/readDeviceBattery');
export const stopScanning = createAction('bleState/stopScanning');
// export const startListening = createAction('bleState/startListening');

// export const connectToDevice = createAction('bleState/connectToDevice');
// export const disconnectDevice = createAction('bleState/disconnectDevice');

const bleState = createSlice({
  name: 'bleState',
  initialState,
  reducers: {
    setDevice: (state, action: DevicesAction) => {
      if (!isDuplicateDevice(state.allDevices, action.payload))
        state.allDevices = [...state.allDevices, action.payload];
    },
    setConnectedDevice: (
      state,
      action: PayloadAction<DeviceReference | null>,
    ) => {
      state.connectedDevice = action.payload;
      state.allDevices = state.allDevices.filter(
        device => device.id !== action.payload?.id,
      );
    },
    setBattery: (state, action: PayloadAction<number | null | undefined>) => {
      state.battery = action.payload;
    },
  },
});

export const {setDevice, setConnectedDevice, setBattery} = bleState.actions;

export default bleState.reducer;
