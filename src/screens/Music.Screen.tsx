import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Header } from "../components/Header";
import LikeVector from "../../assets/vectors/heart.svg";
import BackVector from "../../assets/vectors/back.svg";
import ShuffleVector from "../../assets/vectors/shuffle.svg";
import PauseVector from "../../assets/vectors/pause.svg";
import RepeatVector from "../../assets/vectors/repeat.svg";
import SkipBackVector from "../../assets/vectors/skip_back.svg";
import SkipForwardVector from "../../assets/vectors/skip_forward.svg";
import { colors } from "../theme/colors";
import { songs } from "../mocks/songs.mock";
import { ProgressBar } from "../components/ProgressBar";

const HeaderLeft: React.FC<{ onPress?: void }> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <BackVector color={colors.white} />
    </Pressable>
  );
};

const HeaderRight = () => {
  return (
    <Pressable onPress={() => console.log("pressed")}>
      <LikeVector color={colors.gray} />
    </Pressable>
  );
};

export const MusicScreen: React.FC = ({ navigation, route }) => {
  console.log("route", route.params);

  const audioPlayer = useRef<null>(null);
  const music = route.params ?? {};

  const [play, setPlay] = useState<boolean>(false);

  const onController = () => {
    setPlay((state) => !state);
  };

  return (
    <View style={styles.root}>
      <Header
        left={<HeaderLeft onPress={navigation.goBack} />}
        right={<HeaderRight />}
        title={music.title}
      />
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <Image
            resizeMode="cover"
            source={{
              uri: music.artist.picture_big,
            }}
            style={styles.image}
          />
          <View style={styles.imageTexts}>
            <Text style={styles.title}>{music.title}</Text>
            <Text style={styles.singer}>{music.artist.name}</Text>
          </View>
          <View style={styles.controllers}>
            <ProgressBar time={185} currentTime={120} />
            <View style={styles.buttons}>
              <ShuffleVector color={colors.white} />
              <SkipBackVector color={colors.white} />
              <Pressable onPress={onController} style={styles.pause}>
                {play ? <PauseVector color={colors.white} /> : <LikeVector />}
              </Pressable>
              <SkipForwardVector color={colors.white} />
              <RepeatVector color={colors.white} />
            </View>
          </View>
          <View
            style={{
              height: 81,
              width: "100%",
              backgroundColor: "grey",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 17,
    gap: 32,
  },
  pause: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 99,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
  },
  wrapper: {
    gap: 28,
    flex: 1,
  },
  controllers: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  image: {
    height: 319,
    width: "100%",
    borderRadius: 36,
  },
  imageTexts: {
    gap: 7,
  },
  title: {
    fontFamily: "Nunito-Regular",
    fontSize: 24,
    color: colors.white,
    textAlign: "center",
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  },
});
