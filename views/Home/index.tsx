import { repeat, sortBy } from "lodash";
import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../store";
import { getAlarms } from "../../store/alarms/selectors";
import { hoursToDisplayHours, padTimeString } from "../util";

export default function Home() {
  const alarms = useSelector(getAlarms);
  const dispatch = useDispatch<Dispatch>();

  const sortedAlarms = sortBy(
    alarms,
    (alarmInfo) =>
      new Date(0, 0, 0, alarmInfo.time.hours, alarmInfo.time.minutes)
  );
  const soonestAlarm = sortedAlarms.find((alarmInfo) => {
    if (!alarmInfo.enabled) {
      return true;
    }
    if (!alarmInfo.repeat.some((repeat) => repeat)) {
      return true;
    }
    const currentDayOfWeek = new Date().getDay();
    return alarmInfo.repeat[currentDayOfWeek];
  });

  return (
    <View style={{ width: "100%", backgroundColor: "#111", height: "100%" }}>
      {!soonestAlarm ? (
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 48,
            color: "#eee",
          }}
        >
          You have no alarms set for today.
        </Text>
      ) : (
        <>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 18,
              color: "#eee",
            }}
          >
            Your next alarm is set for{" "}
            {padTimeString(hoursToDisplayHours(soonestAlarm.time.hours))}:
            {padTimeString(soonestAlarm.time.minutes)}
            {soonestAlarm.time.hours >= 12 ? "PM" : "AM"}.
          </Text>
        </>
      )}
    </View>
  );
}
