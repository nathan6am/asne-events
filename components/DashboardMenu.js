import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import React from "react";

export default function DashboardMenu({ loadAgenda, navigation, event }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <FontAwesome5 name="info-circle" size={56} color="#4c97ce" />
        <Text style={styles.iconText}>Info</Text>
      </View>
      <Pressable onPress={loadAgenda} style={styles.item}>
        <FontAwesome5 name="calendar-alt" size={54} color="#4c97ce" />
        <Text style={styles.iconText}>Agenda</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Venue", { venue: event.venue });
        }}
        style={styles.item}
      >
        <Entypo name="location" size={56} color="#4c97ce" />
        <Text style={styles.iconText}>Venue</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Sponsors", { sponsors: event.sponsors });
        }}
        style={styles.item}
      >
        <FontAwesome5 name="hands-helping" size={50} color="#4c97ce" />
        <Text style={styles.iconText}>Sponsors</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Exhibitors", {
            exhibitors: event.exhibitors,
            event: event,
          });
        }}
        style={styles.item}
      >
        <MaterialCommunityIcons name="presentation" size={58} color="#4c97ce" />
        <Text style={styles.iconText}>Exhibitors</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 16,
    backgroundColor: "white",
  },
  item: {
    flexBasis: "25%",
    aspectRatio: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconText: {
    marginTop: 6,
  },
});
