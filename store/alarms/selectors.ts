import { createSelector } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { RootState } from "../rootState";
import { AlarmInfo, State } from "./state";

export type AlarmInfoWithNextTrigger = AlarmInfo & {
  nextTrigger: Date;
};

export const getState = (rootState: RootState): State => rootState.alarms;
export const getAlarms = createSelector(
  [getState],
  (state): AlarmInfoWithNextTrigger[] =>
    state.alarms.map((alarmInfo) => {
      let nextTrigger: Date = new Date();
      nextTrigger.setHours(alarmInfo.time.hours);
      nextTrigger.setMinutes(alarmInfo.time.minutes);
      nextTrigger.setSeconds(0);
      nextTrigger.setMilliseconds(0);

      const now = new Date();
      if (!alarmInfo.repeat.some((repeat) => repeat)) {
        if (nextTrigger < now) {
          nextTrigger = addDays(nextTrigger, 1);
        }
      } else {
        for (let i = 0; i < 7; ++i) {
          if (alarmInfo.repeat[nextTrigger.getDay()] && nextTrigger > now) {
            break;
          }
          nextTrigger = addDays(nextTrigger, 1);
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
        (!soonestAlarm || alarm.nextTrigger < soonestAlarm.nextTrigger)
      ) {
        soonestAlarm = alarm;
      }
    });
    return soonestAlarm;
  }
);
