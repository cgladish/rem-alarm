import {
  initialState as alarmsInitialState,
  State as AlarmsState,
} from "./alarms/state";
import {
  initialState as settingsInitialState,
  State as SettingsState,
} from "./settings/state";

export type RootState = {
  alarms: AlarmsState;
  settings: SettingsState;
};
export const preloadedState: RootState = {
  alarms: alarmsInitialState,
  settings: settingsInitialState,
};
