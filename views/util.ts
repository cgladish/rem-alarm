export const padTimeString = (time: number): string =>
  time > 9 ? `${time}` : `0${time}`;

export const hoursToDisplayHours = (hours: number): number => {
  if (hours == 0 || hours == 12) {
    return 12;
  }
  if (hours > 12) {
    return hours - 12;
  }
  return hours;
};
