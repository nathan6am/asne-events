import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { eventsApi } from "../redux/eventsApi";
import DashboardMenu from "../components/DashboardMenu";
import { useSelector, useDispatch } from "react-redux";
import { addToMyEvents, removeFromMyEvents } from "../redux/actionCreators";
import Loading from "../components/Loading";
import { getOrdinalRange } from "../util/dateUtil";
import { Ionicons, FontAwesome5 } from "react-native-vector-icons";
import Error from "../components/Error";

function AddMessage({ addToMyEvents }) {
  return (
    <TouchableOpacity
      onPress={addToMyEvents}
      style={{
        padding: 16,
        paddingHorizontal: 60,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <FontAwesome5
        name="calendar-plus"
        color="#4c97ce"
        size={40}
        style={{ marginBottom: 16 }}
      />
      <Text style={{ textAlign: "center", opacity: 0.7 }}>
        Save to My Events to use the event dashboard.
      </Text>
    </TouchableOpacity>
  );
}
function EventDetails({ event }) {
  return (
    <View style={{ backgroundColor: "white", marginBottom: 2, padding: 4 }}>
      <Text style={styles.eventTitle}>{event.name}</Text>
      <View style={styles.detailRow}>
        <Ionicons
          name="md-calendar"
          size={16}
          color={"#4c97ce"}
          style={{ marginRight: 4 }}
        />
        <Text>{getOrdinalRange(event.startDate, event.endDate)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons
          name="md-location"
          size={16}
          color={"#4c97ce"}
          style={{ marginRight: 4 }}
        />
        <Text>{`${event.venue.name} - ${event.venue.address.city}, ${event.venue.address.state}`}</Text>
      </View>
    </View>
  );
}

function LiveAndUpcoming({ sessions }) {
  return <View></View>;
}

export default function EventDashboard({ navigation, route }) {
  const savedEvents = useSelector((state) => state.events);

  const isSaved = savedEvents.some(
    (event) => event.id === route.params.eventid
  );
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
        <>
          {error ? (
            <Error />
          ) : (
            <View>
              <Image
                source={{
                  uri: data.event.image,
                }}
                style={{ width: "100%", height: 120 }}
                resizeMode="contain"
              />
              <EventDetails event={data.event} />
              {isSaved ? (
                <DashboardMenu
                  event={data.event}
                  navigation={navigation}
                  loadAgenda={loadAgenda}
                ></DashboardMenu>
              ) : (
                <AddMessage
                  addToMyEvents={() => {
                    dispatch(addToMyEvents(data.event._id));
                  }}
                />
              )}

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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  eventTitle: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "#0b3e78",
  },
  eventDetail: {
    marginVertical: 4,
    marginHorizontal: 16,
    fontSize: 16,
  },
  detailRow: {
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: "row",
    paddingRight: 8,
  },
  sectionHeader: {
    color: "#fff",
    fontSize: 20,
    //fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#4c97ce",
  },
});
