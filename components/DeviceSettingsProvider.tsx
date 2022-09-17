import { createContext, ReactNode, useEffect, useState } from "react";
import notifee, { AndroidNotificationSetting } from "@notifee/react-native";
import { AppState } from "react-native";

export const DeviceSettingsContext = createContext<{
  isAppVisible: boolean;
  isAlarmPermissionsEnabled: boolean;
}>({
  isAppVisible: false,
  isAlarmPermissionsEnabled: false,
});

export default function DeviceSettingsProvider({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const [isAppVisible, setIsAppVisible] = useState(true);
  const [isAlarmPermissionsEnabled, setIsAlarmPermissionsEnabled] =
    useState(false);

  useEffect(() => {
    const updateAlarmEnabled = async () => {
      const settings = await notifee.getNotificationSettings();
      setIsAlarmPermissionsEnabled(
        settings.android.alarm === AndroidNotificationSetting.ENABLED
      );
    };

    updateAlarmEnabled();
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
      value={{ isAppVisible, isAlarmPermissionsEnabled }}
    >
      {children}
    </DeviceSettingsContext.Provider>
  );
}
