import {
  PayloadAction,
  createAction,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {DeviceReference} from './BLEManager';

interface BLEState {
  allDevices: DeviceReference[];
  connectedDevice: DeviceReference | null;
  battery: string | null | undefined;
  left: number | null | undefined;
  right: number | null | undefined;
}

const initialState: BLEState = {
  allDevices: [],
  connectedDevice: null,
  battery: null,
  left: null,
  right: null,
};

const isDuplicateDevice = (
  devices: DeviceReference[],
  nextDevice: DeviceReference,
) => devices.findIndex(device => nextDevice.id === device.id) > -1;

export type DevicesAction = PayloadAction<DeviceReference>;

export const startScanning = createAction('bleState/startScanning');
export const readDeviceBattery = createAction('bleState/readDeviceBattery');
export const stopScanning = createAction('bleState/stopScanning');

export const startListening = createAction('bleState/startListening');
export const stopListening = createAction('bleState/stopListening');

export const _getPosition = createAction('bleInstruction/getPosition');
export const _getVoltage = createAction('bleInstruction/getVoltage');
export const _startReport = createAction('bleInstruction/startReport');
export const _stopReport = createAction('bleInstruction/stopReport');

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
    setBattery: (state, action: PayloadAction<string | null | undefined>) => {
      console.log(action.payload);
      state.battery = action.payload;
    },

    setLeft: (state, action: PayloadAction<number | null | undefined>) => {
      state.left = action.payload;
    },

    setRight: (state, action: PayloadAction<number | null | undefined>) => {
      state.right = action.payload;
    },
  },
});

export const {setDevice, setConnectedDevice, setBattery, setLeft, setRight} =
  bleState.actions;

export default bleState.reducer;
