import {
  View,
  Text,
  StyleSheet,
  Image,
  SectionList,
  Pressable,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { eventsApi } from "../redux/eventsApi";
import { separateEventsByMonth } from "../util/dataSort";
import { getOrdinalRange } from "../util/dateUtil";
import { ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

function EventSections({ sections, refetch, isLoading, toDashboard }) {
  return (
    <SectionList
      style={{ paddingTop: 16 }}
      onRefresh={refetch}
      refreshing={isLoading}
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <EventCard event={item} toDashboard={toDashboard} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}

function EventCard({ event, toDashboard }) {
  return (
    <Pressable
      onPress={() => {
        toDashboard(event);
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 8,
          marginVertical: 16,
          borderRadius: 6,
          paddingBottom: 16,
          elevation: 5,
          boxWithShadow: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          },
        }}
      >
        <Image
          source={{
            uri: event.image,
          }}
          style={{ width: "100%", height: 120 }}
          resizeMode="contain"
        />
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
    </Pressable>
  );
}

export default function SavedEventsScreen({ navigation }) {
  const savedEvents = useSelector((state) => state.events);
  const { data, error, isLoading } =
    eventsApi.endpoints.getAllEvents.useQuery();
  const { refetch } = eventsApi.endpoints.getAllEvents.useQuerySubscription();
  const [eventData, setEventData] = useState([]);
  const toEventDashboard = (event) => {
    navigation.navigate("EventStack", {
      eventid: event._id,
      nameShort: event.nameShort,
    });
  };
  useEffect(() => {
    if (isLoading) return;
    if (error) {
      console.log(error);
      return;
    }
    if (!data) return;
    const filtered = data.events.filter((event) =>
      savedEvents.some((savedEvent) => savedEvent.id == event._id)
    );
    const separated = separateEventsByMonth(filtered);
    setEventData(separated);
  }, [data, savedEvents]);
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#4c97ce" />
      ) : (
        <EventSections
          sections={eventData}
          refetch={refetch}
          isLoading={isLoading}
          toDashboard={toEventDashboard}
        />
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
