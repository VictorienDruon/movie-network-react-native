//copy/paste from https://github.com/HenrikJoreteg/milliseconds/blob/master/milliseconds.js

function calc(m: number) {
  return function (n: number) {
    return Math.round(n * m);
  };
}

export const ms = {
  seconds: calc(1e3),
  minutes: calc(6e4),
  hours: calc(36e5),
  days: calc(864e5),
  weeks: calc(6048e5),
  months: calc(26298e5),
  years: calc(315576e5),
};
