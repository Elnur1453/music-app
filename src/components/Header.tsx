import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";

interface IHeader {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<IHeader> = ({ left, right, title, style }) => {
  return (
    <View style={[styles.root, style]}>
      {left}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {right}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 18,
    lineHeight: 21,
  },
});
