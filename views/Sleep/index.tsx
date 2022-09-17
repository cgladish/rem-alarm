import { isToday, isTomorrow } from "date-fns";
import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { useSelector } from "react-redux";
import notifee from "@notifee/react-native";
import { DeviceSettingsContext } from "../../components/DeviceSettingsProvider";
import { getSoonestAlarm } from "../../store/alarms/selectors";
import { hoursToDisplayHours, padTimeString } from "../util";

export default function Sleep() {
  const soonestAlarm = useSelector(getSoonestAlarm);
  const { isAlarmPermissionsEnabled } = useContext(DeviceSettingsContext);

  const isAlarmSet =
    soonestAlarm &&
    (isToday(soonestAlarm.nextTrigger) || isTomorrow(soonestAlarm.nextTrigger));

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
      {!isAlarmPermissionsEnabled && (
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
            marginBottom: 10,
          }}
        >
          Your alarms will not work as intended due to missing permissions.
        </Text>
      )}
      {isAlarmPermissionsEnabled && !isAlarmSet && (
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
          }}
        >
          You have no alarms set for today or tomorrow.
        </Text>
      )}
      {isAlarmPermissionsEnabled && isAlarmSet && (
        <>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 18,
              color: "#eee",
            }}
          >
            Your next alarm is set for{" "}
            {padTimeString(hoursToDisplayHours(soonestAlarm!.time.hours))}:
            {padTimeString(soonestAlarm!.time.minutes)}
            {soonestAlarm!.time.hours >= 12 ? "PM" : "AM"}{" "}
            {isToday(soonestAlarm!.nextTrigger) ? "today" : "tomorrow"}.
          </Text>
        </>
      )}
    </View>
  );
}
