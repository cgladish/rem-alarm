export type State = {
  timeToFallAsleepMinutes: number;
  remCycleLengthMinutes: number;
};

export const initialState: State = {
  timeToFallAsleepMinutes: 10,
  remCycleLengthMinutes: 90,
};
