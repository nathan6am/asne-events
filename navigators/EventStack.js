import { createStackNavigator } from "@react-navigation/stack";

//Screens
import EventListTabs from "./EventListTabs";
import EventDashboard from "../screens/EventDashboard";
import AgendaScreen from "../screens/AgendaScreen";
import SponsorScreen from "../screens/SponsorScreen";
import ExhibitorsScreen from "../screens/ExhibitorsScreen";
import VenueDetailsScreen from "../screens/VenueDetailsScreen";
import SessionDetailsScreen from "../screens/SessionDetailsScreen";
import VenueMap from "../screens/VenueMapScreen";
const Stack = createStackNavigator();
import EventContextWrapper from "../components/EventContextWrapper";
export default function EventStack({ route }) {
  const eventid = route.params.eventid;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0b3d78" },
        headerTitleStyle: { color: "white" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        presentation: "card",
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={EventDashboard}
        options={{ title: route.params.nameShort }}
        initialParams={{ eventid: eventid }}
      />
      <Stack.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          headerStyle: {
            backgroundColor: "#0b3d78",
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen name="Sponsors" component={SponsorScreen} />
      <Stack.Screen name="Venue" component={VenueDetailsScreen} />
      <Stack.Screen name="Venue Map" component={VenueMap} />
      <Stack.Screen
        name="Session Details"
        component={SessionDetailsScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Exhibitors"
        component={ExhibitorsScreen}
        options={{
          title: "Exhibitor Directory",
          headerStyle: {
            backgroundColor: "#0b3d78",
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}
