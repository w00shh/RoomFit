import BLEManager from './BLEManager';

export const getPosition = async () => {
  await BLEManager.getPosition();
};

export const getVoltage = async () => {
  await BLEManager.getVoltage();
};

export const startReport = async () => {
  await BLEManager.startReport();
};

export const stopReport = async () => {
  await BLEManager.stopReport();
};

export const setWeight = async () => {
  await BLEManager.setWeight();
};

export const setRange = async () => {
  await BLEManager.setRange();
};

export const calibrate = async () => {
  await BLEManager.calibrate();
};
