import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../store";
import { getState as getSettings } from "../../store/settings/selectors";

export default function Settings() {
  const settings = useSelector(getSettings);
  const dispatch = useDispatch<Dispatch>();

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#111",
        height: "100%",
        paddingTop: 40,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity style={{ width: "100%" }}>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
          }}
        >
          Time to Fall Asleep
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 16,
            color: "#bbb",
          }}
        >
          {settings.timeToFallAsleepMinutes} minutes
        </Text>
        {/*
        <TextInput
          style={{
            color: "#eee",
            borderColor: "#eee",
            borderWidth: 1,
            borderRadius: 16,
            backgroundColor: "#222",
            width: "100%",
            paddingHorizontal: 12,
            height: 40,
            fontSize: 16,
            marginTop: 6,
          }}
          onChangeText={(text) =>
            dispatch({
              type: "@@settings/UPDATE_REM_CYCLE_LENGTH",
              payload: { data: Number(text) },
            })
          }
          value={settings.remCycleLengthMinutes.toString()}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        */}
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 18, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
          }}
        >
          REM Cycle Length
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 16,
            color: "#bbb",
          }}
        >
          {settings.remCycleLengthMinutes} minutes
        </Text>
        {/*
        <TextInput
          style={{
            color: "#eee",
            borderColor: "#eee",
            borderWidth: 1,
            borderRadius: 16,
            backgroundColor: "#222",
            width: "100%",
            paddingHorizontal: 12,
            height: 40,
            fontSize: 16,
            marginTop: 6,
          }}
          onChangeText={(text) =>
            dispatch({
              type: "@@settings/UPDATE_REM_CYCLE_LENGTH",
              payload: { data: Number(text) },
            })
          }
          value={settings.remCycleLengthMinutes.toString()}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        */}
      </TouchableOpacity>
    </View>
  );
}
