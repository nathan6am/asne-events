import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToAgenda, removeFromAgenda } from "../redux/actionCreators";
import { updateNotes } from "../redux/actionCreators";
import { Ionicons, Entypo, FontAwesome5 } from "react-native-vector-icons";
import SessionTags from "../components/SessionTags";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { RectButton } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { getOrdinalRange } from "../util/dateUtil";
export default function SessionDetailsScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const session = route.params.session;
  const richText = useRef();
  const scrollRef = useRef();
  const currentEvent = useSelector((state) =>
    state.events.find((event) => event.id === session.eventid)
  );
  const initialNotes = currentEvent.sessionNotes[session._id] || "";
  const inMyAgenda = currentEvent.myAgenda.some(
    (mysession) => mysession.id === session._id
  );
  const venue = route.params.venue;
  const [notes, setNotes] = useState(initialNotes);
  function blurEditor() {
    richText.current?.blurContentEditor();
  }
  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", blurEditor);
    return () => {
      Keyboard.removeAllListeners;
    };
  }, []);
  function saveNotes() {
    console.log(notes);
    dispatch(updateNotes(session.eventid, session._id, notes));
  }
  const timeRange = `${dayjs(session.startTime).format("h:mm A")} - ${dayjs(
    session.endTime
  ).format("h:mm A")}`;

  function getTimeRange(start, end) {
    return `${dayjs(start).format("h:mm A")} - ${dayjs(end).format("h:mm A")}`;
  }
  const [scrollOffset, setScrollOffset] = useState(0);
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}on>
      <View>
        <View style={{ backgroundColor: "white", padding: 16 }}>
          <Text style={styles.title}>{session.name}</Text>
          <SessionTags style={{ marginBottom: 8 }} tags={session.tags} />
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
            <RectButton
              onPress={() => {
                navigation.navigate("Venue Map", { venue: venue });
              }}
              style={{
                backgroundColor: "#d6eaff",
                padding: 6,
                borderRadius: 3,
                marginRight: 8,
                flexDirection: "row",
                paddingHorizontal: 8,
              }}
            >
              <Ionicons
                name="map"
                size={16}
                color={"#4c97ce"}
                style={{ marginRight: 4, marginTop: 1 }}
              />
              <Text style={{ color: "#4c97ce" }}> Venue Map</Text>
            </RectButton>
          </View>
        </View>
        {inMyAgenda ? (
          <RectButton
            onPress={() => {
              dispatch(removeFromAgenda(session.eventid, session._id));
            }}
            style={{
              marginTop: 2,
              backgroundColor: "white",
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="calendar-times"
              color="red"
              size={20}
              style={{ marginRight: 16 }}
            ></FontAwesome5>
            <Text>Remove from My Agenda</Text>
          </RectButton>
        ) : (
          <RectButton
            onPress={() => {
              dispatch(addToAgenda(session.eventid, session._id));
            }}
            style={{
              marginTop: 2,
              backgroundColor: "white",
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="calendar-plus"
              color="#4c97ce"
              size={20}
              style={{ marginRight: 16 }}
            ></FontAwesome5>
            <Text>Add to My Agenda</Text>
          </RectButton>
        )}
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
        {session.presenters[0] && (
          <View>
            <Text
              style={{
                padding: 8,
                opacity: 1,
                alignItems: "center",
              }}
            >
              Presenters:
            </Text>
            {session.presenters.map((speaker, idx) => (
              <View
                key={idx}
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
            {session.speakers.map((speaker, idx) => (
              <View
                key={idx}
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
            {session.panelists.map((panelist, idx) => (
              <View
                key={idx}
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
        {session.papers[0] && (
          <View>
            <Text
              style={{
                padding: 8,
                opacity: 1,
                alignItems: "center",
              }}
            >
              Papers:
            </Text>
            {session.papers.map((paper, idx) => (
              <View
                key={idx}
                style={{
                  padding: 8,
                  paddingHorizontal: 19,
                  backgroundColor: "white",
                  marginVertical: 1,
                }}
              >
                <View style={styles.detailRow}>
                  <Ionicons
                    name="time"
                    size={16}
                    color={"#4c97ce"}
                    style={{ marginRight: 3, marginTop: 1 }}
                  />
                  <Text>{getTimeRange(paper.startTime, paper.endTime)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text
                    style={{
                      color: "#0b3d78",
                      fontStyle: "italic",
                      fontSize: 16,
                    }}
                  >{`"${paper.title}"`}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="person"
                    size={16}
                    color={"#4c97ce"}
                    style={{ marginRight: 3, marginTop: 1 }}
                  />
                  <Text style={{ opacity: 0.5 }}>{paper.author}</Text>
                </View>
                <Text>Moderator: {paper.moderator}</Text>
              </View>
            ))}
          </View>
        )}

        <KeyboardAvoidingView
          onLayout={({ nativeEvent }) => {
            setScrollOffset(nativeEvent.layout.y);
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ padding: 8 }}
        >
          <Text style={{ marginVertical: 8 }}>Notes:</Text>
          <RichEditor
            ref={richText}
            onBlur={saveNotes}
            onFocus={() => {
              scrollRef.current.scrollTo({
                y: scrollOffset + 15,
                animated: true,
              });
            }}
            initialContentHTML={notes}
            androidLayerType="software"
            androidHardwareAccelerationDisabled
            onChange={(descriptionText) => {
              setNotes(descriptionText);
            }}
            onCursorPosition={(scrollY) => {
              scrollRef.current.scrollTo({
                y: scrollY + scrollOffset + 15,
                animated: true,
              });
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
            selectedIconTint="#fbb730"
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

    marginVertical: 4,
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
