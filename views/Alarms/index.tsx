import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dispatch } from "../../store";
import { getAlarms } from "../../store/alarms/selectors";
import { AlarmInfo } from "../../store/alarms/state";
import { useState } from "react";

const padTimeString = (time: number): string =>
  time > 9 ? `${time}` : `0${time}`;

const hoursToDisplayHours = (hours: number): number => {
  if (hours == 0 || hours == 12) {
    return 12;
  }
  if (hours > 12) {
    return hours - 12;
  }
  return hours;
};

const dayOfWeekToText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayOfWeekShort = ["S", "M", "T", "W", "T", "F", "S"];

const AlarmItem = ({
  index,
  alarmInfo,
}: {
  index: number;
  alarmInfo: AlarmInfo;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSettingTime, setIsSettingTime] = useState(false);

  const dispatch = useDispatch<Dispatch>();

  const repeats = Object.values(alarmInfo.repeat).some((repeat) => repeat);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#222",
        borderRadius: 16,
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "100%",
      }}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {isSettingTime && (
        <DateTimePicker
          mode="time"
          value={
            new Date(0, 0, 0, alarmInfo.time.hours, alarmInfo.time.minutes)
          }
          onChange={(event, date) => {
            setIsSettingTime(false);
            if (event.type === "set") {
              dispatch({
                type: "@@alarms/UPDATE_TIME",
                payload: {
                  index,
                  time: {
                    hours: date!.getHours(),
                    minutes: date!.getMinutes(),
                  },
                },
              });
            }
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: "Roboto",
                fontWeight: alarmInfo.enabled ? "900" : "400",
                fontSize: 48,
                color: alarmInfo.enabled ? "#eee" : "#bbb",
              }}
              onPress={() => setIsSettingTime(true)}
            >
              {padTimeString(hoursToDisplayHours(alarmInfo.time.hours))}:
              {padTimeString(alarmInfo.time.minutes)}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto",
                fontWeight: alarmInfo.enabled ? "900" : "400",
                fontSize: 18,
                marginBottom: 10,
                marginLeft: 5,
                color: alarmInfo.enabled ? "#eee" : "#bbb",
              }}
              onPress={() => setIsSettingTime(true)}
            >
              {alarmInfo.time.hours >= 12 ? "PM" : "AM"}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Roboto",
              color: alarmInfo.enabled ? "#eee" : "#bbb",
            }}
          >
            {!repeats && alarmInfo.enabled && "Tomorrow"}
            {!repeats && !alarmInfo.enabled && "Not set"}
            {repeats &&
              alarmInfo.repeat
                .map((enabled, index) => [enabled, index])
                .filter(([enabled, index]) => enabled)
                .map(([enabled, index]) => dayOfWeekToText[index as number])
                .join(", ")}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Switch
            onChange={() => {
              dispatch({
                type: "@@alarms/UPDATE_ENABLED",
                payload: { index, enabled: !alarmInfo.enabled },
              });
            }}
            value={alarmInfo.enabled}
            trackColor={{ true: "#FF8C00" }}
            thumbColor="#eee"
          />
          <Ionicons
            name={isExpanded ? "md-chevron-up" : "md-chevron-down"}
            size={32}
            color={alarmInfo.enabled ? "#eee" : "#bbb"}
          />
        </View>
      </View>
      {isExpanded && (
        <View style={{ flexDirection: "row", flex: 1, marginTop: 10 }}>
          {alarmInfo.repeat.map((enabled, dayOfWeek) => (
            <TouchableOpacity
              onPress={() =>
                dispatch({
                  type: "@@alarms/UPDATE_REPEAT",
                  payload: { index, dayOfWeek, enabled: !enabled },
                })
              }
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: enabled ? "#FF8C00" : "#ccc",
                  backgroundColor: enabled ? "#FF8C00" : undefined,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <Text
                  style={{ color: enabled ? "#eee" : "#ccc", fontSize: 18 }}
                >
                  {dayOfWeekShort[dayOfWeek]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function Alarms() {
  const alarms = useSelector(getAlarms);
  const dispatch = useDispatch<Dispatch>();

  return (
    <>
      <ScrollView style={{ width: "100%", backgroundColor: "#111" }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 150,
            paddingTop: 20,
          }}
        >
          {alarms.map((alarmInfo, index) => (
            <AlarmItem key={index} index={index} alarmInfo={alarmInfo} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 40,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: "#444",
            width: 100,
            height: 100,
          }}
          onPress={() =>
            dispatch({ type: "@@alarms/ADD", payload: { data: {} } })
          }
        >
          <Text style={{ fontFamily: "Roboto", fontSize: 48, color: "#fff" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
