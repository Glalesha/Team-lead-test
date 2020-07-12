export default (number, units) => {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return units[2];
  }
  number %= 10;
  if (number === 1) {
    return units[0];
  }
  if (number >= 2 && number <= 4) {
    return units[1];
  }
  return units[2];
};
