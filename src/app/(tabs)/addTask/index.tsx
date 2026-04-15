import CalendarComponent from "@/components/calendarComponent";
import { colors } from "@/constants/defaultBasics";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTask() {
  const now = new Date();
  const year = now.getFullYear();
  const monthName = now
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const dayName = now.toLocaleString("default", { weekday: "short" });
  const dateNumber = now.getDate();

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{dateNumber}</Text>
          <View style={styles.dateYearContainer}>
            <View style={styles.monthYearContainer}>
              <Text style={styles.month}>{monthName}</Text>
              <Text style={styles.year}>{year}</Text>
            </View>
            <Text style={styles.day}>{dayName}</Text>
          </View>
        </View>
        <View>
          <CalendarComponent />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: colors.backgroud,
    gap: 34,
    paddingBottom: 80,
    // borderWidth: 2,
  },
  dateContainer: {
    // borderWidth: 2,
    justifyContent: "flex-start",
    width: "100%",
    gap: 6,
  },
  dayText: {
    fontWeight: "800",
    fontSize: 140,
    // fontFamily: "Inter/Helvetica Neue Heavy",
  },
  dateYearContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  monthYearContainer: {},
  month: {
    fontSize: 42,
    fontWeight: "800",
  },
  year: {
    fontSize: 42,
    fontWeight: "300",
    color: colors.lightGray,
  },
  day: {
    fontSize: 42,
    fontWeight: "500",
    color: colors.mediumGray,
  },
});
