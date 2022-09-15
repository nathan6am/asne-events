import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNotes } from "../redux/actionCreators";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

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
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Text>{session.name}</Text>
        <Text>{session.eventid}</Text>
        <Text>{session.endTime}</Text>
        <Text>{session.room}</Text>
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
