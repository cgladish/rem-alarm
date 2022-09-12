import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./store";
import Alarms from "./views/Alarms";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="alarms"
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen name="alarms" component={Alarms} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
