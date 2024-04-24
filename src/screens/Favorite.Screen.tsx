import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Header } from "../components/Header";
import BackVector from "../../assets/vectors/back.svg";
import { colors } from "../theme/colors";
import { Card } from "../components/Card";
import { CommonStyles } from "../theme/common";
import { screenWidth } from "../theme/consts.styles";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import Loading from "../components/Loading";

export const FavoriteScreen: React.FC = () => {
  const [songs, setSongs] = useState<any>(null);

  const navigation = useNavigation<any>();

  const fetchData = async () => {
    try {
      const songsData = await fetchSongs();
      setSongs(songsData);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const HeaderLeft = () => {
    const handleBackPress = () => navigation.goBack();

    return (
      <Pressable onPress={handleBackPress}>
        <BackVector color={colors.white} />
      </Pressable>
    );
  };

  const onCardPress = (
    title?: string,
    url?: string,
    singer?: string,
    duration?: number,
    audio?: string
  ): void => {
    navigation.navigate("Music", {
      title,
      url,
      singer,
      duration,
      audio,
    });
  };

  const renderItems = ({ item }: { item: any }) => {
    return (
      <Card
        size="l"
        onPress={() =>
          onCardPress(
            item.title,
            item.artist.picture_big,
            item.artist.name,
            item.duration,
            item.preview
          )
        }
        url={item.artist.picture_big}
        style={{ width: "100%" }}
        imageStyle={{ width: cardWidth }}
      />
    );
  };

  if (!songs) {
    return <Loading></Loading>;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Header left={<HeaderLeft />} />
      <View style={styles.info}>
        <Image
          style={styles.image}
          source={{ uri: songs[0].artist.picture_big }}
        />
        <View style={CommonStyles.flex}>
          <View style={styles.cardTitle}>
            <Text style={styles.singer}>Elnur Namaz</Text>
            <Text style={styles.text}>elnz1453@gmail.com</Text>
          </View>
          <Text style={[styles.text, styles.member]}>Gold Member</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            hendrerit euismod justo, id tempus mi condimentum ac
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <Text style={styles.singer}>Favourite Album</Text>
        <FlashList
          estimatedItemSize={50}
          data={songs}
          renderItem={({
            item: { title, artist, preview, duration },
          }: {
            item: any;
          }) => (
            <Card
              size="l"
              url={artist.picture_big}
              onPress={() =>
                onCardPress(
                  title,
                  artist.picture_big,
                  artist.name,
                  duration,
                  preview
                )
              }
            />
          )}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: 9, height: "100%" }} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={CommonStyles.flex}>
        <Text style={styles.singer}>Favourite Music</Text>
        <FlashList
          data={songs}
          estimatedItemSize={50}
          scrollEnabled={false}
          renderItem={renderItems}
          numColumns={3}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </ScrollView>
  );
};

const screenPaddingSize = 17 * 2;
const cardWidth = Math.floor((screenWidth - screenPaddingSize - 18) / 3);

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 17,
    gap: 32,
    minHeight: "100%",
    minWidth: "100%",
    paddingBottom: 40,
    backgroundColor: colors.dark,
  },
  cardTitle: {
    gap: 2,
  },
  member: {
    marginTop: 11,
    marginBottom: 13,
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.white,
    marginBottom: 24,
  },
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  info: {
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 91,
    height: 100,
    borderRadius: 10,
  },
});
