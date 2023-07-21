function padZeros(binaryStr, length) {
  const diff = length - binaryStr.length;
  if (diff <= 0) return binaryStr;
  return '0'.repeat(diff) + binaryStr;
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

function binaryToDecimal(binaryStr) {
  return parseInt(binaryStr, 2);
}
