export function sliceEthAddress(address: string, startLength = 6, endLength = 4) {
  // Check if the address length is less than or equal to the sum of start and end lengths
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
