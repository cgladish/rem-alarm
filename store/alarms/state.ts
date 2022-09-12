export type AlarmInfo = {
  time: {
    hours: number;
    minutes: number;
  };
  repeat: {
    0: boolean;
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
  };
  enabled: boolean;
};

export type State = {
  alarms: AlarmInfo[];
};

export const initialState: State = {
  alarms: [],
};
