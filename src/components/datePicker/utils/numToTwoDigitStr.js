export const numToTwoDigitStr = (num) => {
  if (parseInt(num) < 10) {
    return "0" + num;
  } else {
    return num.toString();
  }
};

export default numToTwoDigitStr;
