import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
import EventListScreen from "../screens/EventListScreen";
import SavedEventsScreen from "../screens/SavedEventsScreen";
export default function EventListTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "#fbb730" } }}
    >
      <Tab.Screen name="Upcoming" component={EventListScreen} />
      <Tab.Screen name="My Events" component={SavedEventsScreen} />
    </Tab.Navigator>
  );
}
