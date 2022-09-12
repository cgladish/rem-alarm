export type AlarmInfo = {
  time: Date;
};

export type State = {
  alarms: AlarmInfo[];
};

export const initialState: State = {
  alarms: [],
};
