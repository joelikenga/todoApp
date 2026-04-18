import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

interface CheckBoxComponentProps {
  checked: boolean;
  onPress: () => void;
  color?: string;
  size?: number;
}

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({
  checked,
  onPress,
  color = "#000",
  size = 24,
}) => {
  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      tension: 180,
      friction: 10,
    }).start();
  }, [checked]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 0.82,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 8,
      }),
    ]).start();
    onPress();
  };

  const iconSize = size * 0.62;
  const borderRadius = size * 0.28;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={{ width: size, height: size }}
    >
      <Animated.View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderRadius,
            borderColor: checked ? color : "#a9a9a9",
            backgroundColor: checked ? color : "transparent",
            transform: [{ scale: bounceAnim }],
            shadowColor: checked ? color : "transparent",
            shadowOffset: { width: 0, height: checked ? 3 : 0 },
            shadowOpacity: checked ? 0.35 : 0,
            shadowRadius: checked ? 8 : 0,
            elevation: checked ? 5 : 0,
            position:"relative",
            
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          }}
        >
          <FontAwesome6 name="check" size={iconSize} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CheckBoxComponent;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
