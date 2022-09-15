import { View, Text, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { eventsApi } from "../redux/eventsApi";
import DashboardMenu from "../components/DashboardMenu";
import { useSelector, useDispatch } from "react-redux";
import { addToMyEvents, removeFromMyEvents } from "../redux/actionCreators";
import Loading from "../components/Loading";

function EventDetails({ event }) {
  return <View></View>;
}

function LiveAndUpcoming({ sessions }) {
  return <View></View>;
}

export default function EventDashboard({ navigation, route }) {
  const savedEvents = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const { data, error, isLoading } = eventsApi.endpoints.getEventById.useQuery(
    route.params.eventid
  );
  const { refetch } = eventsApi.endpoints.getEventById.useQuerySubscription(
    route.params.eventid
  );
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    if (isLoading) return;
    if (error) return;
    if (!data) return;
    setEventData(data);
    //console.log(data);
  }, [data]);
  const loadAgenda = () => {
    navigation.navigate("Agenda", { event: data.event });
  };
  return (
    <View>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{
              uri: data.event.image,
            }}
            style={{ width: "100%", height: 120 }}
            resizeMode="contain"
          />
          <DashboardMenu
            event={data.event}
            navigation={navigation}
            loadAgenda={loadAgenda}
          ></DashboardMenu>
          <Pressable
            onPress={() => {
              dispatch(addToMyEvents(data.event._id));
            }}
          >
            <Text>Save to My Events</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log(savedEvents);
            }}
          >
            <Text>Logger</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(removeFromMyEvents(data.event._id));
            }}
          >
            <Text>Remove from My Events</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
