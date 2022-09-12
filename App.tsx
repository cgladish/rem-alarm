import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { store } from "./store";
import Alarms from "./views/Alarms";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar animated={true} backgroundColor="#222" style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Alarms"
          screenOptions={{
            headerStyle: { backgroundColor: "#222" },
            headerTitleStyle: { color: "#eee" },
          }}
        >
          <Stack.Screen name="Alarms" component={Alarms} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
