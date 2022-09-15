import { createStackNavigator } from "@react-navigation/stack";

import EventListTabs from "./EventListTabs";
import EventStack from "./EventStack";
import { View, Text } from "react-native";
import React from "react";
const Stack = createStackNavigator();
export default function EventListStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0b3d78" },
        headerTitleStyle: { color: "white" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Events" component={EventListTabs} />
      <Stack.Screen
        name="EventStack"
        component={EventStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
