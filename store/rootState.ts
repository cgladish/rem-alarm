import {
  initialState as alarmsInitialState,
  State as AlarmsState,
} from "./alarms/state";

export type RootState = {
  alarms: AlarmsState;
};
export const preloadedState: RootState = {
  alarms: alarmsInitialState,
};
