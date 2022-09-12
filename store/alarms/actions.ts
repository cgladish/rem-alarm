import { AlarmInfo } from "./state";

export type AddAlarmAction = {
  type: "@@alarms/ADD";
  payload: { data: AlarmInfo };
};
export type RemoveAlarmAction = {
  type: "@@alarms/REMOVE";
  payload: { index: number };
};
export type UpdateAlarmAction = {
  type: "@@alarms/UPDATE";
  payload: { index: number; data: AlarmInfo };
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
