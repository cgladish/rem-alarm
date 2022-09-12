import React, { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../store";
import { getState as getSettings } from "../../store/settings/selectors";

export default function Settings() {
  const settings = useSelector(getSettings);
  const dispatch = useDispatch<Dispatch>();

  const [isTimeToFallAsleepDropdownOpen, setIsTimeToFallAsleepDropdownOpen] =
    useState(false);
  const [timeToFallAsleepItems] = useState(
    [1, 5, 10, 15, 20, 25, 30].map((value) => ({
      label: `${value.toString()} minutes`,
      value: value,
    }))
  );

  const [isRemCycleLengthDropdownOpen, setIsRemCycleLengthDropdownOpen] =
    useState(false);
  const [remCycleLengthItems] = useState(
    [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120].map((value) => ({
      label: `${value.toString()} minutes`,
      value: value,
    }))
  );

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
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
          }}
        >
          Time to Fall Asleep
        </Text>
        <DropDownPicker
          open={isTimeToFallAsleepDropdownOpen}
          setOpen={setIsTimeToFallAsleepDropdownOpen}
          value={settings.timeToFallAsleepMinutes}
          setValue={(value) =>
            dispatch({
              type: "@@settings/UPDATE_TIME_TO_FALL_ASLEEP",
              payload: { data: value(settings.timeToFallAsleepMinutes) },
            })
          }
          items={timeToFallAsleepItems}
          theme="DARK"
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      <View style={{ marginTop: 18, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: "#eee",
          }}
        >
          REM Cycle Length
        </Text>
        <DropDownPicker
          open={isRemCycleLengthDropdownOpen}
          setOpen={setIsRemCycleLengthDropdownOpen}
          value={settings.remCycleLengthMinutes}
          setValue={(value) =>
            dispatch({
              type: "@@settings/UPDATE_REM_CYCLE_LENGTH",
              payload: { data: value(settings.remCycleLengthMinutes) },
            })
          }
          items={remCycleLengthItems}
          theme="DARK"
          zIndex={2000}
          zIndexInverse={1000}
        />
      </View>
    </View>
  );
}
