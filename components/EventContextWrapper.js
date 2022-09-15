import { View, Text, Image, Pressable } from "react-native";
import React, { useState, useEffect, createContext } from "react";
import { eventsApi } from "../redux/eventsApi";
import DashboardMenu from "../components/DashboardMenu";
import { useSelector, useDispatch } from "react-redux";
import { addToMyEvents, removeFromMyEvents } from "../redux/actionCreators";
import Loading from "../components/Loading";

export default function EventContextWrapper({ eventid, children }) {
  const event = eventsApi.endpoints.getEventById.useQuery(eventid);
  const { refetch } =
    eventsApi.endpoints.getEventById.useQuerySubscription(eventid);

  const EventContext = createContext({});
  return (
    <EventContext.Provider value={event}>{children}</EventContext.Provider>
  );
}
