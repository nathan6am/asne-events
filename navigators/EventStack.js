import { createStackNavigator } from "@react-navigation/stack";

//Screens
import EventListTabs from "./EventListTabs";
import EventDashboard from "../screens/EventDashboard";

const Stack = createStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#195a97" },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
        }}
        name="Events"
        component={EventListTabs}
      />
      <Stack.Screen
        name="Dashboard"
        component={EventDashboard}
        options={({ route, navigation }) => ({
          title: route.params.nameShort,
        })}
      />
    </Stack.Navigator>
  );
}
