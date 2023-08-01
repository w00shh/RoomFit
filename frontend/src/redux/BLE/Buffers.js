function padZeros(binaryStr, length) {
  const diff = length - binaryStr.length;
  if (diff <= 0) return binaryStr;
  return '0'.repeat(diff) + binaryStr;
}

function binaryToDecimal(binaryStr) {
  return parseInt(binaryStr, 2);
}

export function positionBuffer(decimalArray) {
  const binaryArray = decimalArray.map(decimal =>
    padZeros(decimal.toString(2), 8),
  );

  const startIndex_left = 38;
  const startIndex_right = 54;
  const numBits = 10;

  const selectedBinaryStr_left = binaryArray
    .join('')
    .substr(startIndex_left, numBits);
  const decimalValue_left = binaryToDecimal(selectedBinaryStr_left);

  const selectedBinaryStr_right = binaryArray
    .join('')
    .substr(startIndex_right, numBits);
  const decimalValue_right = binaryToDecimal(selectedBinaryStr_right);

  return [decimalValue_left, decimalValue_right];
}

export function voltageBuffer(decimalArray) {
  const binaryArray = decimalArray.map(decimal =>
    padZeros(decimal.toString(2), 8),
  );

  const startIdx = 32;
  const voltageStr = binaryArray.join('').substr(startIdx, 8);
  const voltage = binaryToDecimal(voltageStr);

  console.log(voltage);
  return voltage;
}

export function reportBuffer(decimalArray) {
  const binaryArray = decimalArray.map(decimal =>
    padZeros(decimal.toString(2), 8),
  );

  const timeBits = 8;
  const timeIndex_high = 24;
  const timeIndex_low = 32;

  const startIndex_left = 54;
  const startIndex_right = 70;
  const positionBits = 10;

  const highStr = binaryArray.join('').substr(timeIndex_high, timeBits);
  const high = binaryToDecimal(highStr);

  const lowStr = binaryArray.join('').substr(timeIndex_low, timeBits);
  const low = binaryToDecimal(lowStr);

  const leftStr = binaryArray.join('').substr(startIndex_left, positionBits);
  const left = binaryToDecimal(leftStr);

  const rightStr = binaryArray.join('').substr(startIndex_right, positionBits);
  const right = binaryToDecimal(rightStr);

  return [high, low, left, right];
}
