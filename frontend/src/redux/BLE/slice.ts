import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';
import {DeviceReference} from './BLEManager';

interface BLEState {
  allDevices: DeviceReference[];
  connectedDevice: DeviceReference | null;
}

const initialState: BLEState = {
  allDevices: [],
  connectedDevice: null,
};

const isDuplicateDevice = (
  devices: DeviceReference[],
  nextDevice: DeviceReference,
) => devices.findIndex(device => nextDevice.id === device.id) > -1;

export type DevicesAction = PayloadAction<DeviceReference>;

export const startScanning = createAction('bleState/startScanning');
export const stopScanning = createAction('bleState/stopScanning');
export const startListening = createAction('bleState/startListening');

// export const connectToDevice = createAction('bleState/connectToDevice');
export const disconnectDevice = createAction('bleState/disconnectDevice');

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
    },
  },
});

export const {setDevice, setConnectedDevice} = bleState.actions;

export default bleState.reducer;
