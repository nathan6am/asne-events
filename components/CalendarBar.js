import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { generateCalendarStrip } from "../util/dateUtil";
import dayjs from "dayjs";

function DateTab({ date, activeDate, setActiveDate }) {
  const active = dayjs(date.day).isSame(activeDate, "day");
  return (
    <Pressable
      style={{
        ...styles.item,
        ...(date.disabled && styles.disabled),
      }}
      onPress={() => {
        if (date.disabled) return;
        setActiveDate(date.day);
      }}
    >
      <Text style={styles.dowText}>{dayjs(date.day).format("ddd")}</Text>
      <Text style={{ ...styles.numText, ...(active && styles.active) }}>
        {dayjs(date.day).format("DD")}
      </Text>
    </Pressable>
  );
}

export default function CalendarBar({
  start,
  end,
  onChange,
  activeDate,
  setActiveDate,
}) {
  const dates = generateCalendarStrip(start, end);

  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "column",
        elevation: 2,
      }}
    >
      {/* <Text style={{ textAlign: "center", marginVertical: 8, opacity: 0.5 }}>
        September 2022
      </Text> */}
      <View style={styles.container}>
        {dates.map((date, idx) => (
          <DateTab
            date={date}
            key={idx}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 8,
    flexDirection: "row",
  },
  item: {
    flexBasis: "16.5%",
    justifyContent: "center",
    alignItems: "center",
    height: 63,
  },
  disabled: {
    opacity: 0.4,
  },

  dowText: {
    textAlign: "center",
  },
  numText: {
    textAlign: "center",
    padding: 4,
    aspectRatio: 1,
    borderBottomWidth: 4,
    borderColor: "transparent",
    fontSize: 24,
  },
  active: {
    borderColor: "#fbb730",
  },
});
