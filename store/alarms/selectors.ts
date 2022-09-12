import { createSelector } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { RootState } from "../rootState";
import { AlarmInfo, State } from "./state";

export type AlarmInfoWithNextTrigger = AlarmInfo & {
  nextTrigger: Date | null;
};

export const getState = (rootState: RootState): State => rootState.alarms;
export const getAlarms = createSelector(
  [getState],
  (state): AlarmInfoWithNextTrigger[] =>
    state.alarms.map((alarmInfo) => {
      let nextTrigger: Date | null = null;
      const now = new Date();
      const tomorrow = addDays(now, 1);
      if (!alarmInfo.repeat.some((repeat) => repeat)) {
        nextTrigger = new Date();
        nextTrigger.setHours(alarmInfo.time.hours);
        nextTrigger.setMinutes(alarmInfo.time.minutes);
        if (nextTrigger < now) {
          nextTrigger = addDays(nextTrigger, 1);
        }
      } else {
        if (alarmInfo.repeat[now.getDay()]) {
          nextTrigger = new Date();
          nextTrigger.setHours(alarmInfo.time.hours);
          nextTrigger.setMinutes(alarmInfo.time.minutes);
        }
        if (
          (!nextTrigger || nextTrigger < now) &&
          alarmInfo.repeat[tomorrow.getDay()]
        ) {
          nextTrigger = new Date(tomorrow.getTime());
          nextTrigger.setHours(alarmInfo.time.hours);
          nextTrigger.setMinutes(alarmInfo.time.minutes);
        }
      }
      return {
        ...alarmInfo,
        nextTrigger,
      };
    })
);
export const getSoonestAlarm = createSelector(
  [getAlarms],
  (alarms): AlarmInfoWithNextTrigger | null => {
    let soonestAlarm: AlarmInfoWithNextTrigger | null = null;
    alarms.forEach((alarm) => {
      if (!alarm.enabled) {
        return;
      }
      if (
        alarm.nextTrigger &&
        (!soonestAlarm?.nextTrigger ||
          alarm.nextTrigger < soonestAlarm.nextTrigger)
      ) {
        soonestAlarm = alarm;
      }
    });
    return soonestAlarm;
  }
);
