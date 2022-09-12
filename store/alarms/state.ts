export type AlarmInfo = {
  time: {
    hours: number;
    minutes: number;
  };
  repeat: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  enabled: boolean;
};

export type State = {
  alarms: AlarmInfo[];
};

export const initialState: State = {
  alarms: [],
};
