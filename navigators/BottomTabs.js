import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventStack from "./EventStack";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import NetworkingScreen from "../screens/NetworkingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventListStack from "./EventListStack";
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      barStyle={{ backgroundColor: "#0b3d78" }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-calendar" size={20} color={color} />
          ),
        }}
        name="Home"
        component={EventListStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-people-sharp" size={20} color={color} />
          ),
        }}
        name="Connect"
        component={NetworkingScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person-sharp" size={20} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
