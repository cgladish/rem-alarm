import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import notifee, { AndroidImportance, TriggerType } from "@notifee/react-native";
import { getAlarms } from "../store/alarms/selectors";
import { DeviceSettingsContext } from "./DeviceSettingsProvider";

export default function AlarmSetter() {
  const alarms = useSelector(getAlarms);
  const { isAlarmPermissionsEnabled, alarmSounds } = useContext(
    DeviceSettingsContext
  );
  const [notificationChannel, setNotificationChannel] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      try {
        if (notificationChannel) {
          await notifee.deleteChannel(notificationChannel);
        }
        const channel = await notifee.createChannel({
          id: "alarm",
          name: "Firing alarms & timers",
          lights: false,
          vibration: true,
          sound: alarmSounds[0]?.url,
          importance: AndroidImportance.HIGH,
        });
        setNotificationChannel(channel);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [alarmSounds]);

  useEffect(() => {
    (async () => {
      try {
        await notifee.cancelAllNotifications();
        for (let alarm of alarms) {
          if (alarm.enabled) {
            if (isAlarmPermissionsEnabled) {
              await notifee.createTriggerNotification(
                {
                  title: "REM Alarm",
                  android: {
                    channelId: notificationChannel,
                    fullScreenAction: {
                      id: "default",
                    },
                  },
                },
                {
                  type: TriggerType.TIMESTAMP,
                  timestamp: alarm.nextTrigger.getTime(),
                  alarmManager: {
                    allowWhileIdle: true,
                  },
                }
              );
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [notificationChannel, alarms]);

  return null;
}
