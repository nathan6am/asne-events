import { View, Text } from "react-native";
import React, { useEffect, useState, createContext, useContext } from "react";
import { generateCalendarStrip } from "../util/dateUtil";
import CalendarBar from "../components/CalendarBar";
import { eventsApi } from "../redux/eventsApi";
import Agenda from "../components/Agenda";
export default function AgendaScreen({ route }) {
  const event = route.params.event;
  [activeDate, setActiveDate] = useState(event.startDate);
  const { data, error, isLoading } =
    eventsApi.endpoints.getEventSessions.useQuery(route.params.event._id);
  const { refetch } = eventsApi.endpoints.getEventSessions.useQuerySubscription(
    route.params.event._id
  );

  const SessionsContext = createContext({});

  return (
    <View style={{ flex: 1 }}>
      <CalendarBar
        start={event.startDate}
        end={event.endDate}
        onChange={(date) => {
          setActiveDate(date);
        }}
      />
      {!isLoading && (
        <Agenda
          sessions={data?.sessions}
          activeDate={activeDate}
          eventid={route.params.event._id}
        />
      )}
    </View>
  );
}
