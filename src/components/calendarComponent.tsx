import { colors } from "@/utils/defaultBasics";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];

function getDaysInMonth(year: number, month: number) {
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const days: { day: string; state: string; fullDate: string }[] = [];

  for (let i = 0; i < startOffset; i++) {
    days.push({ day: "", state: "empty", fullDate: "" });
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const isToday = date.toDateString() === today.toDateString(); // ← your original comparison

    const isPast =
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) &&
      !isToday;

    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");

    days.push({
      day: String(d),
      state: isToday ? "today" : isPast ? "past" : "future",
      fullDate: `${year}-${mm}-${dd}`,
    });
  }

  return days;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

function DayCircle({
  state,
  day,
  fullDate,
}: {
  state: string;
  day: string;
  fullDate: string;
}) {
  if (state === "empty") {
    return <View style={styles.circle} />;
  }

  const bgColor =
    state === "past"
      ? colors.nearBlack
      : state === "today"
        ? colors.orange
        : "#D4D4D2";

  const textColor =
    state === "past"
      ? "#FFFFFF"
      : state === "today"
        ? "#FFFFFF"
        : colors.mediumGray;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/screens/[createTask]",
          params: { createTask: fullDate },
        })
      }
      style={[styles.circle, { backgroundColor: bgColor }]}
    >
      <Text style={[{ color: textColor, fontSize: 20 }]}>{day}</Text>
    </TouchableOpacity>
  );
}

const CalendarComponent = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const allDays = getDaysInMonth(year, month);
  const weeks = chunkArray(allDays, 7);

  return (
    <View>
      <View style={{ width: "100%", gap: 8 }}>
        <View
          style={[
            styles.row,
            {
              justifyContent: "space-between",
              paddingHorizontal: 0,
              alignItems: "center",
            },
          ]}
        >
          {DAYS_OF_WEEK.map((d, i) => (
            <View key={i} style={styles.days}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color:
                    i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)
                      ? colors.orange
                      : colors.black,
                }}
              >
                {d}
              </Text>
            </View>
          ))}
        </View>

        {weeks.map((week, wi) => (
          <View key={wi} style={[styles.row]}>
            {week.map((item, di) => (
              <DayCircle
                key={di}
                state={item.state}
                day={item.day}
                fullDate={item.fullDate}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  days: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});