//COMPONENTS AND HOOKS
import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState, createContext, useContext } from "react";
import CalendarBar from "../components/CalendarBar";
import { eventsApi } from "../redux/eventsApi";
import Agenda from "../components/Agenda";
import { TabView } from "react-native-tab-view";
import Loading from "../components/Loading";

//UTIL
import { generateCalendarStrip } from "../util/dateUtil";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

//Returns an array of routes for each calendar day
function getTabRoutes(start, end) {
  const dates = generateCalendarStrip(start, end)
    .filter((el) => !el.disabled)
    .map((el) => el.day);
  const routes = dates.map((day, idx) => {
    return {
      key: day,
      title: dayjs(day).format("dddd MMMM Do"),
    };
  });
  return routes;
}

export default function AgendaScreen({ route }) {
  //CONSTANTS
  const layout = useWindowDimensions();
  const event = route.params.event;
  const eventid = route.params.event._id;
  const routes = getTabRoutes(event.startDate, event.endDate);

  //COMPONENT STATE
  const [activeDate, setActiveDate] = useState(event.startDate);
  const [tabIdx, setTabIdx] = useState(0);

  //Session data from Api
  const { data, error, isLoading } =
    eventsApi.endpoints.getEventSessions.useQuery(route.params.event._id);

  //Call refetch to refresh api results
  const { refetch } = eventsApi.endpoints.getEventSessions.useQuerySubscription(
    route.params.event._id
  );

  //Returns Agenda component for calendar route
  const renderScene = (sceneProps) => {
    const date = sceneProps.route.key;
    return (
      <Agenda
        sessions={data?.sessions}
        date={date}
        eventid={eventid}
        event={event}
      />
    );
  };

  useEffect(() => {
    setTabIdx(
      routes.findIndex((path) => dayjs(path.key).isSame(activeDate, "day"))
    );
  }, [activeDate]);

  return (
    <View style={{ flex: 1 }}>
      <CalendarBar
        start={event.startDate}
        end={event.endDate}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <TabView
          renderTabBar={() => {}}
          renderScene={renderScene}
          navigationState={{ index: tabIdx, routes: routes }}
          onIndexChange={(idx) => {
            setActiveDate(routes[idx].key);
          }}
          initialLayout={{ width: layout.width }}
        />
      )}
    </View>
  );
}
