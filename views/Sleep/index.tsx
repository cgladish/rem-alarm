import { isToday, isTomorrow } from "date-fns";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getSoonestAlarm } from "../../store/alarms/selectors";
import { hoursToDisplayHours, padTimeString } from "../util";

export default function Sleep() {
  const soonestAlarm = useSelector(getSoonestAlarm);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#111",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!soonestAlarm ||
      !(
        isToday(soonestAlarm.nextTrigger) ||
        isTomorrow(soonestAlarm.nextTrigger)
      ) ? (
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
          }}
        >
          You have no alarms set for today or tomorrow.
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
            {soonestAlarm.time.hours >= 12 ? "PM" : "AM"}{" "}
            {isToday(soonestAlarm.nextTrigger) ? "today" : "tomorrow"}.
          </Text>
        </>
      )}
    </View>
  );
}
