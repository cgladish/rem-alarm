import { createContext, ReactNode, useEffect, useState } from "react";
import notifee, { AndroidNotificationSetting } from "@notifee/react-native";
import NotificationSounds, { Sound } from "react-native-notification-sounds";
import { AppState, Platform } from "react-native";

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
    const updateAlarmEnabled = async () => {
      const settings = await notifee.getNotificationSettings();
      setIsAlarmPermissionsEnabled(
        settings.android.alarm === AndroidNotificationSetting.ENABLED
      );
    };
    updateAlarmEnabled();

    NotificationSounds.getNotifications(
      Platform.OS === "android" ? "alarm" : "ringtone"
    ).then((soundsList) => setAlarmSounds(soundsList));

    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (nextAppState === "active") {
          if (!isAppVisible) {
            updateAlarmEnabled();
          }
          setIsAppVisible(true);
        } else {
          setIsAppVisible(false);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  return (
    <DeviceSettingsContext.Provider
      value={{ isAppVisible, isAlarmPermissionsEnabled, alarmSounds }}
    >
      {children}
    </DeviceSettingsContext.Provider>
  );
}
