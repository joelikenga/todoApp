import { colors } from "@/utils/defaultBasics";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];
function getDaysInMonth(year: number, month: number) {
  const router = useRoute();
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const totalDays = new Date(year, month + 1, 0).getDate(); // total days in month

  // Convert Sunday-based (0-6) to Monday-based (0-6)
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  // Fill empty slots before the 1st
  for (let i = 0; i < startOffset; i++) {
    days.push({ day: "", state: "empty" });
  }

  // Fill actual days
  for (let d = 1; d <= totalDays; d++) {
    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const isPast =
      new Date(year, month, d) <
      new Date(today.getFullYear(), today.getMonth(), today.getDate());

    days.push({
      day: String(d),
      state: isToday ? "today" : isPast ? "past" : "future",
    });
  }

  return days;
}

// Split flat array into rows of 7
function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

function DayCircle({ state, day }: { state: string; day: string }) {
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
      onPress={() => {
        router.push(`/screens/addTask`);
      }}
      style={[styles.circle, { backgroundColor: bgColor }]}
    >
      <Text style={[{ color: textColor, fontSize: 20 }]}>{day}</Text>
    </TouchableOpacity>
  );
}

const CalendarComponent = () => {
  const now = new Date();
  //   const dayName = now.toLocaleString("default", { weekday: "narrow" }).toUpperCase();
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
                    i ===
                    (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)
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
              <DayCircle key={di} state={item.state} day={item.day} />
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
    // width: "100vw",
    // gap: 1,
    // borderWidth: 2,
  },
  days: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    // borderWidth: 2,
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
