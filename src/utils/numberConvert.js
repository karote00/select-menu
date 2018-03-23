import { ONES, TENS, TEENS } from '../constants';

export const convert_millions = (num) => {
  if (num >= 1000000) {
    return `${convert_millions(Math.floor(num / 1000000))} Million ${convert_thousands(num % 1000000)}`;
  }
  else {
    return convert_thousands(num);
  }
}

export const convert_thousands = (num) => {
  if (num >= 1000) {
    return `${convert_hundreds(Math.floor(num / 1000))} Thousand ${convert_hundreds(num % 1000)}`;
  }
  else{
    return convert_hundreds(num);
  }
}

export const convert_hundreds = (num) => {
  if (num > 99) {
    return `${ONES[Math.floor(num / 100)]} Hundred ${convert_tens(num % 100)}`;
  }
  else{
    return convert_tens(num);
  }
}

export const convert_tens = (num) => {
  if (num < 10) return ONES[num];
  else if (num >= 10 && num < 20) return TEENS[num - 10];
  else{
    return `${TENS[Math.floor(num / 10)]} ${ONES[num % 10]}`;
  }
}

export const convert = (num) => {
  if (num == 0) return "Zero";
  else return convert_millions(num);
}

const numberConvert = {
  convert,
  convert_tens,
  convert_hundreds,
  convert_thousands,
  convert_millions,
};

export default numberConvert;
