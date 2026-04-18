import TaskOverview from "@/components/overview";
import { colors } from "@/utils/defaultBasics";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tasks = () => {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <TaskOverview />
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroud,
    flex: 1,
  },
});
