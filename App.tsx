import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { store } from "./store";
import Alarms from "./views/Alarms";
import Home from "./views/Home";
import Settings from "./views/Settings";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => {
            return {
              headerStyle: { backgroundColor: "#222" },
              headerTitleStyle: { color: "#eee" },
              tabBarActiveBackgroundColor: "#FF8C00",
              tabBarActiveTintColor: "#eee",
              tabBarInactiveBackgroundColor: "#222",
              tabBarInactiveTintColor: "#bbb",
              tabBarStyle: {
                borderTopWidth: 0,
              },
              tabBarLabelStyle: {
                fontSize: 16,
              },
              tabBarIcon: ({ focused }) => {
                switch (route.name) {
                  case "Home":
                    return (
                      <Ionicons
                        name="home"
                        size={22}
                        color={focused ? "#eee" : "#bbb"}
                      />
                    );
                  case "Alarms":
                    return (
                      <Ionicons
                        name="alarm"
                        size={22}
                        color={focused ? "#eee" : "#bbb"}
                      />
                    );
                  case "Settings":
                    return (
                      <Ionicons
                        name="settings"
                        size={22}
                        color={focused ? "#eee" : "#aaa"}
                      />
                    );
                  default:
                    return null;
                }
              },
            };
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Alarms" component={Alarms} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
