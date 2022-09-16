import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNotes } from "../redux/actionCreators";
import { Ionicons } from "react-native-vector-icons";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import dayjs from "dayjs";
export default function SessionDetailsScreen({ route }) {
  const dispatch = useDispatch();
  const session = route.params.session;
  const richText = useRef();
  const scrollRef = useRef();
  const currentEvent = useSelector((state) =>
    state.events.find((event) => event.id === session.eventid)
  );
  const initialNotes = currentEvent.sessionNotes[session._id] || "";
  const [notes, setNotes] = useState(initialNotes);
  function saveNotes() {
    console.log(notes);
    dispatch(updateNotes(session.eventid, session._id, notes));
  }
  const timeRange = `${dayjs(session.startTime).format("h:mm A")} - ${dayjs(
    session.endTime
  ).format("h:mm A")}`;
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <View style={{ backgroundColor: "white", padding: 16 }}>
          <Text style={styles.title}>{session.name}</Text>
          <Text style={styles.sectionHeader}>Time</Text>
          <View style={styles.contentRow}>
            <View style={styles.detailRow}>
              <Ionicons
                name="time"
                size={16}
                color={"#4c97ce"}
                style={{ marginRight: 3, marginTop: 1 }}
              />
              <Text style={{ opacity: 0.7 }}>{timeRange}</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.5)",
                padding: 6,
                borderRadius: 3,
                marginRight: 8,
              }}
            >
              <Text style={{ opacity: 0.7, marginHorizontal: 8 }}>
                Add to My Agenda
              </Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Room</Text>
          <View style={styles.contentRow}>
            <View style={{ ...styles.detailRow, marginTop: 8 }}>
              <Ionicons
                name="md-location"
                size={16}
                color={"#4c97ce"}
                style={{ marginRight: 3, marginTop: 1 }}
              />
              <Text style={{ opacity: 0.7 }}>{session.room}</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.5)",
                padding: 6,
                borderRadius: 3,
                marginRight: 8,
              }}
            >
              <Text style={{ opacity: 0.7, marginHorizontal: 8 }}>
                Open Venue Map
              </Text>
            </View>
          </View>
        </View>
        {session.awards[0] && (
          <View>
            <Text
              style={{
                padding: 8,
                opacity: 1,
                alignItems: "center",
              }}
            >
              Awards:
            </Text>
            {session.awards.map((award) => (
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 19,
                  backgroundColor: "white",

                  marginVertical: 1,
                }}
              >
                <Text
                  style={{
                    marginVertical: 2,
                    opacity: 0.7,
                  }}
                >
                  {award.award}
                </Text>
                <Text
                  style={{
                    marginVertical: 2,
                    fontFamily: "sans-serif-medium",
                    color: "#0b3d78",
                    fontSize: 16,
                    opacity: 1,
                  }}
                >
                  {award.recipient}
                </Text>
              </View>
            ))}
          </View>
        )}
        {session.speakers[0] && (
          <View>
            <Text
              style={{
                padding: 8,
                opacity: 1,
                alignItems: "center",
              }}
            >
              Speakers:
            </Text>
            {session.speakers.map((speaker) => (
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 19,
                  backgroundColor: "white",

                  marginVertical: 1,
                }}
              >
                <Text
                  style={{
                    marginVertical: 2,
                    fontFamily: "sans-serif-medium",
                    fontSize: 16,
                    color: "#0b3d78",
                  }}
                >
                  {speaker.fullName}
                </Text>
                <Text
                  style={{
                    marginVertical: 2,
                    opacity: 0.5,
                  }}
                >
                  {speaker.position}
                </Text>
              </View>
            ))}
          </View>
        )}
        {session.panelists[0] && (
          <View>
            <Text
              style={{
                padding: 8,
                opacity: 1,
                alignItems: "center",
              }}
            >
              Panelists:
            </Text>
            {session.panelists.map((panelist) => (
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 19,
                  backgroundColor: "white",

                  marginVertical: 1,
                }}
              >
                <Text
                  style={{
                    marginVertical: 2,
                    fontFamily: "sans-serif-medium",
                    fontSize: 16,
                    color: "#0b3d78",
                  }}
                >
                  {panelist.fullName}
                </Text>
                <Text
                  style={{
                    marginVertical: 2,
                    opacity: 0.5,
                  }}
                >
                  {panelist.position}
                </Text>
              </View>
            ))}
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ padding: 8 }}
        >
          <Text style={{ marginVertical: 8 }}>Notes:</Text>
          <RichEditor
            ref={richText}
            onBlur={saveNotes}
            initialContentHTML={notes}
            androidLayerType="software"
            androidHardwareAccelerationDisabled
            onChange={(descriptionText) => {
              setNotes(descriptionText);
            }}
            onCursorPosition={(scrollY) => {
              scrollRef.current.scrollTo({ y: scrollY - 15, animated: true });
            }}
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.indent,
              actions.outdent,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
            ]}
            selectedIconTint="#4c97ce"
            iconGap={14}
          />
        </KeyboardAvoidingView>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          richText.current.blurContentEditor();
        }}
      >
        <View style={{ flexGrow: 1 }}></View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "sans-serif-medium",
    fontSize: 20,

    marginBottom: 4,
  },
  detailRow: {
    marginVertical: 4,
    flexDirection: "row",
  },
  sectionHeader: { fontFamily: "sans-serif-medium", opacity: 0.5 },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
