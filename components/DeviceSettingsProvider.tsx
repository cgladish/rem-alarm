import { createContext, ReactNode, useEffect, useState } from "react";
import notifee, { AndroidNotificationSetting } from "@notifee/react-native";
import NotificationSounds, { Sound } from "react-native-notification-sounds";
import { Alert, AppState, Platform } from "react-native";

export const DeviceSettingsContext = createContext<{
  isAppVisible: boolean;
  isAlarmPermissionsEnabled: boolean;
  alarmSounds: Sound[];
}>({
  isAppVisible: false,
  isAlarmPermissionsEnabled: false,
  alarmSounds: [],
});

export default function DeviceSettingsProvider({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const [isAppVisible, setIsAppVisible] = useState(true);
  const [isAlarmPermissionsEnabled, setIsAlarmPermissionsEnabled] =
    useState(false);
  const [alarmSounds, setAlarmSounds] = useState<Sound[]>([]);

  useEffect(() => {
    NotificationSounds.getNotifications(
      Platform.OS === "android" ? "alarm" : "ringtone"
    ).then((soundsList) => setAlarmSounds(soundsList));

    const subscription = AppState.addEventListener("change", (nextAppState) =>
      setIsAppVisible(nextAppState === "active")
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isAppVisible) {
      (async () => {
        setIsAlarmPermissionsEnabled(false);

        const settings = await notifee.getNotificationSettings();
        if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
          return Alert.alert(
            "Restrictions Detected",
            "You need to enable scheduling alarms in your permissions settings.",
            [
              {
                text: "OK, open settings",
                onPress: () => notifee.openAlarmPermissionSettings(),
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }

        const batteryOptimizationEnabled =
          await notifee.isBatteryOptimizationEnabled();
        if (batteryOptimizationEnabled) {
          return Alert.alert(
            "Restrictions Detected",
            "To ensure alarms are triggered, please disable battery optimization for the app.",
            [
              {
                text: "OK, open settings",
                onPress: () => notifee.openBatteryOptimizationSettings(),
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }

        setIsAlarmPermissionsEnabled(true);
      })();
    }
  }, [isAppVisible]);

  return (
    <DeviceSettingsContext.Provider
      value={{ isAppVisible, isAlarmPermissionsEnabled, alarmSounds }}
    >
      {children}
    </DeviceSettingsContext.Provider>
  );
}
