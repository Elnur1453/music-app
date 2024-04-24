import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../theme/colors";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.dark,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
            marginBottom: 20,
          }}
        >
          Loading...
        </Text>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
};

export default Loading;
