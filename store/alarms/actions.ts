import { AlarmInfo } from "./state";

export type AddAlarmAction = {
  type: "@@alarms/ADD";
  payload: { data: Partial<AlarmInfo> };
};
export type RemoveAlarmAction = {
  type: "@@alarms/REMOVE";
  payload: { index: number };
};
export type UpdateAlarmAction = {
  type: "@@alarms/UPDATE";
  payload: { index: number; data: Partial<AlarmInfo> };
};
export type MoveAlarmAction = {
  type: "@@alarms/MOVE";
  payload: { index: number; newIndex: number };
};

export type Action =
  | AddAlarmAction
  | RemoveAlarmAction
  | UpdateAlarmAction
  | MoveAlarmAction;
