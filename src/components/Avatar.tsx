import {
  StyleSheet,
  Text,
  View,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import Ring from "../../assets/vectors/ring.svg";
import { colors } from "../theme/colors";

interface IAvatar {
  title: string;
  caption: string;
  url?: string;
  style?: StyleProp<ViewStyle>;
}
export const Avatar: React.FC<IAvatar> = ({ title, caption, url, style }) => {
  return (
    <View style={[styles.root, style]}>
      {url ? <Image style={styles.image} source={{ uri: url }} /> : null}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    flexDirection: "row",
    gap: 13,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
    fontSize: 18,
    lineHeight: 20,
  },
  caption: {
    fontFamily: "Nunito-Regular",
    color: colors.lightGray,
    fontSize: 14,
    lineHeight: 20,
  },
});
