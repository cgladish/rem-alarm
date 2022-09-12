import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAlarms } from "../../store/alarms/selectors";

export default function Alarms() {
  const alarms = useSelector(getAlarms);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
