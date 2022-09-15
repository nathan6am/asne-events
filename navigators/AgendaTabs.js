import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Agenda from "../components/Agenda";
import { useEffect } from "react";
const Tab = createMaterialTopTabNavigator();
import EventListScreen from "../screens/EventListScreen";
import SavedEventsScreen from "../screens/SavedEventsScreen";
export default function AgendaTabs({ sessions, event }) {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "#fbb730" } }}
    >
      <Tab.Screen
        name="Full Agenda"
        component={Agenda}
        initialParams={{ event: event, sessions: sessions }}
      />
      <Tab.Screen
        name="My Agenda"
        component={Agenda}
        initialParams={{ event: event, sessions: sessions }}
      />
    </Tab.Navigator>
  );
}
