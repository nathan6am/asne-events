import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { isSameDay } from "../util/dateUtil";
import dayjs from "dayjs";
import { Ionicons } from "react-native-vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToAgenda, removeFromAgenda } from "../redux/actionCreators";
import { useNavigation } from "@react-navigation/native";
import SessionTags from "./SessionTags";
function formatSessions(sessions) {
  let sectionList = [];
  sessions.forEach((session) => {
    const idx = sectionList.findIndex(
      (section) => section.startTime == session.startTime
    );
    if (idx === -1) {
      sectionList.push({
        title: dayjs(session.startTime).format("h:mm A"),
        startTime: session.startTime,
        data: [session],
      });
    } else {
      sectionList[idx].data.push(session);
      sectionList.sort();
    }
  });
  return sectionList.sort((a, b) => {
    if (a.startTime === b.startTime) return 0;
    if (dayjs(a.startTime).isBefore(dayjs(b.startTime))) return -1;
    return 1;
  });
}

function SessionCard({
  session,
  inAgenda,
  addItem,
  removeItem,
  eventid,
  venue,
}) {
  const timeRange = `${dayjs(session.startTime).format("h:mm A")} - ${dayjs(
    session.endTime
  ).format("h:mm A")}`;
  const navigation = useNavigation();
  return (
    <View style={styles.agendaCard}>
      <Pressable
        onPress={() => {
          navigation.navigate("Session Details", {
            session: session,
            venue: venue,
          });
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "85%" }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.sessionTitle}
            >
              {session.name}
            </Text>
            <View style={styles.detailRow}>
              <Ionicons
                name="time"
                size={16}
                color={"#4c97ce"}
                style={{ marginRight: 3, marginTop: 1 }}
              />
              <Text style={{ opacity: 0.7 }}>{timeRange}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="md-location"
                size={16}
                color={"#4c97ce"}
                style={{ marginRight: 3, marginTop: 1 }}
              />
              <Text style={{ opacity: 0.5 }}>{session.room}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginVertical: 4,
              }}
            >
              <SessionTags tags={session.tags} />
            </View>
          </View>
          <Pressable
            style={{
              width: 30,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingEnd: 4,
            }}
            onPress={() => {
              if (inAgenda) {
                removeItem(session._id);
              } else {
                addItem(session._id);
              }
            }}
          >
            <Ionicons
              name={inAgenda ? "checkmark-circle" : "add-circle-outline"}
              size={24}
              color={"#fbb730"}
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}
function SessionList({
  sessionData,
  mySessions,
  addItem,
  removeItem,
  eventid,
  venue,
}) {
  return (
    <SectionList
      style={{ paddingTop: 4 }}
      sections={sessionData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <SessionCard
          session={{ ...item, eventid: eventid }}
          inAgenda={
            mySessions && mySessions.some((session) => session.id === item._id)
          }
          addItem={addItem}
          removeItem={removeItem}
          venue={venue}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}

export default function Agenda({
  sessions,
  date,
  eventid,
  event,
  isMyAgenda,
  filters,
}) {
  const dispatch = useDispatch();
  const localEventData = useSelector((state) => state.events).find(
    (event) => event.id === eventid
  );
  const mySessions = localEventData && localEventData.myAgenda;
  const venue = event.venue;

  const filterMyAgenda = (sessions) => {
    const filtered = sessions.filter((item) => {
      return (
        mySessions && mySessions.some((session) => session.id === item._id)
      );
    });
    return filtered;
  };
  const filterTags = (sessions, filters) => {
    if (filters.all) {
      return sessions;
    } else {
      return sessions.filter((session) =>
        session.tags.every((tag) => {
          switch (tag) {
            case "keynote":
              return filters.keynotes;
            case "panel":
              return filters.panels;
            case "innovation":
              return filters.innovation;
            case "invite-only":
              return filters.invite;
            case "technical":
              return filters.technical;
            default:
              return filters.other;
          }
        })
      );
    }
  };

  const [sessionsToDisplay, setSessionsToDisplay] = useState(
    formatSessions(
      sessions.filter((session) => {
        return isSameDay(session.startTime, date);
      })
    )
  );
  useEffect(() => {
    if (isMyAgenda) {
      setSessionsToDisplay(
        formatSessions(
          filterTags(
            filterMyAgenda(
              sessions.filter((session) => {
                return isSameDay(session.startTime, date);
              })
            ),
            filters
          )
        )
      );
    } else {
      setSessionsToDisplay(
        formatSessions(
          filterTags(
            sessions.filter((session) => {
              return isSameDay(session.startTime, date);
            }),
            filters
          )
        )
      );
    }
  }, [mySessions, isMyAgenda, sessions, filters]);

  const addItem = (sessionid) => {
    dispatch(addToAgenda(eventid, sessionid));
  };

  const removeItem = (sessionid) => {
    dispatch(removeFromAgenda(eventid, sessionid));
  };
  return (
    <View style={{ paddingBottom: 16 }}>
      <SessionList
        sessionData={sessionsToDisplay}
        mySessions={mySessions}
        addItem={addItem}
        removeItem={removeItem}
        eventid={eventid}
        venue={venue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  agendaCard: {
    backgroundColor: "white",
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 2,
    boxWithShadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "semi-bold",
    color: "#0b3e78",
    marginBottom: 4,
  },
  detailRow: {
    marginVertical: 4,
    flexDirection: "row",
    paddingRight: 8,
  },
});
