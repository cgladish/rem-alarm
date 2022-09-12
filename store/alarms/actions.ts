import { AlarmInfo } from "./state";

export type AddAlarmAction = {
  type: "@@alarms/ADD";
  payload: { data: Partial<AlarmInfo> };
};
export type RemoveAlarmAction = {
  type: "@@alarms/REMOVE";
  payload: { index: number };
};
export type UpdateAlarmTimeAction = {
  type: "@@alarms/UPDATE_TIME";
  payload: { index: number; time: AlarmInfo["time"] };
};
export type UpdateAlarmEnabledAction = {
  type: "@@alarms/UPDATE_ENABLED";
  payload: { index: number; enabled: boolean };
};
export type UpdateAlarmRepeatAction = {
  type: "@@alarms/UPDATE_REPEAT";
  payload: { index: number; dayOfWeek: number; enabled: boolean };
};
export type MoveAlarmAction = {
  type: "@@alarms/MOVE";
  payload: { index: number; newIndex: number };
};

export type Action =
  | AddAlarmAction
  | RemoveAlarmAction
  | UpdateAlarmTimeAction
  | UpdateAlarmEnabledAction
  | UpdateAlarmRepeatAction
  | MoveAlarmAction;
