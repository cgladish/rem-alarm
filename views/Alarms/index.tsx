import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dispatch } from "../../store";
import { getAlarms } from "../../store/alarms/selectors";
import { AlarmInfo } from "../../store/alarms/state";
import { useState } from "react";

const padTimeString = (time: number): string =>
  time > 9 ? `${time}` : `0${time}`;

const dayOfWeekToText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const AlarmItem = ({
  index,
  alarmInfo,
}: {
  index: number;
  alarmInfo: AlarmInfo;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const repeats = Object.values(alarmInfo.repeat).some((repeat) => repeat);
  const dispatch = useDispatch<Dispatch>();
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: alarmInfo.enabled ? "900" : "400",
              fontSize: 48,
              color: alarmInfo.enabled ? "#eee" : "#bbb",
            }}
          >
            {padTimeString(alarmInfo.time.hours)}:
            {padTimeString(alarmInfo.time.minutes)}
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              color: alarmInfo.enabled ? "#eee" : "#bbb",
            }}
          >
            {!repeats && alarmInfo.enabled && "Tomorrow"}
            {!repeats && !alarmInfo.enabled && "Not set"}
            {repeats &&
              Object.entries(alarmInfo.repeat)
                .filter(([day, enabled]) => enabled)
                .map(([day]) => dayOfWeekToText[Number(day)])
                .join(", ")}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Switch
            onChange={() => {
              dispatch({
                type: "@@alarms/UPDATE",
                payload: {
                  index,
                  data: { ...alarmInfo, enabled: !alarmInfo.enabled },
                },
              });
            }}
            value={alarmInfo.enabled}
          />
          <Ionicons
            name={isExpanded ? "md-chevron-up" : "md-chevron-down"}
            size={32}
            color={alarmInfo.enabled ? "#eee" : "#bbb"}
          />
        </View>
      </View>
      {isExpanded && <View></View>}
    </TouchableOpacity>
  );
};

export default function Alarms() {
  const alarms = useSelector(getAlarms);
  const dispatch = useDispatch<Dispatch>();

  return (
    <>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            backgroundColor: "#111",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 150,
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
            dispatch({
              type: "@@alarms/ADD",
              payload: {
                data: {
                  time: { hours: 0, minutes: 0 },
                  repeat: {
                    0: false,
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                    6: false,
                  },
                  enabled: true,
                },
              },
            })
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
