import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import notifee, { AndroidImportance, TriggerType } from "@notifee/react-native";
import { getAlarms } from "../store/alarms/selectors";

export default function AlarmSetter() {
  const alarms = useSelector(getAlarms);
  const [notificationChannel, setNotificationChannel] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      try {
        const channel = await notifee.createChannel({
          id: "alarm",
          name: "Firing alarms & timers",
          lights: false,
          vibration: true,
          importance: AndroidImportance.HIGH,
        });
        setNotificationChannel(channel);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await notifee.cancelAllNotifications();
        for (let alarm of alarms) {
          if (alarm.enabled) {
            await notifee.createTriggerNotification(
              {
                title: "REM Alarm",
                android: {
                  channelId: notificationChannel,
                },
              },
              {
                type: TriggerType.TIMESTAMP,
                timestamp: alarm.nextTrigger.getTime(),
              }
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [notificationChannel, alarms]);

  return null;
}
