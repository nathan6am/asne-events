import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState, createContext, useContext } from "react";
import { generateCalendarStrip } from "../util/dateUtil";
import CalendarBar from "../components/CalendarBar";
import { eventsApi } from "../redux/eventsApi";
import Agenda from "../components/Agenda";
import { TabView } from "react-native-tab-view";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

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
  const layout = useWindowDimensions();
  const event = route.params.event;
  const eventid = route.params.event._id;
  const [activeDate, setActiveDate] = useState(event.startDate);
  const { data, error, isLoading } =
    eventsApi.endpoints.getEventSessions.useQuery(route.params.event._id);
  const { refetch } = eventsApi.endpoints.getEventSessions.useQuerySubscription(
    route.params.event._id
  );

  const renderScene = (sceneProps) => {
    const date = sceneProps.route.key;
    return (
      <Agenda sessions={data?.sessions} activeDate={date} eventid={eventid} />
    );
  };
  const routes = getTabRoutes(event.startDate, event.endDate);
  useEffect(() => {
    setTabIdx(
      routes.findIndex((path) => dayjs(path.key).isSame(activeDate, "day"))
    );
  }, [activeDate]);

  const [tabIdx, setTabIdx] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <CalendarBar
        start={event.startDate}
        end={event.endDate}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
      {!isLoading && (
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
