import { colors } from "@/constants/defaultBasics";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TaskOverview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.greetContainer}>
        <Text style={styles.greet}>Hey,Joel</Text>
        <Text style={styles.motivationText}>Let's make progress today !</Text>
      </View>

      <View style={styles.tasksContainer}>
        {/* <Text>hhhh</Text> */}
      </View>
    </View>
  );
};

export default TaskOverview;

const styles = StyleSheet.create({
  container: {
    
    paddingHorizontal: 16,
    paddingBottom: 80,
    gap: 20,
  },
  greetContainer: {
    // borderWidth: 1,
  },
  greet: {
    fontSize: 25,
    fontWeight: "600",
  },
  motivationText: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "cursive",
  },
  tasksContainer: {
    backgroundColor: "#fff",
    height:80,
    borderRadius:20
  },
});
