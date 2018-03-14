function addZero(value, double) {
  value = Number(value);
  if (double) {
    if (value < 100 && value > 9) {
      value = '0' + value;
    } else if (value < 10) {
      value = '00' + value;
    } else {
      return value;
    }
  } else {
    value = value < 10 ? '0' + value : value;
  }

  return value;
}

export default addZero;