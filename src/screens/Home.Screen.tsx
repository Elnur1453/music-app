import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import RingVector from "../../assets/vectors/ring.svg";
import SearchVector from "../../assets/vectors/search.svg";
import { activeIndex, standardHitSlop } from "../theme/standart";
import { colors } from "../theme/colors";
import { Input } from "../components/Input";
import { Card, ICard } from "../components/Card";
import { songs } from "../mocks/songs.mock";
import { FlashList } from "@shopify/flash-list";
import { CommonStyles } from "../theme/common";
import { Routes } from "../router/Routes";
import { Endpoint } from "../services/endpoint";
import { Loading } from "../components/Loading";

export const HomeScreen: React.FC = ({ navigation }) => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const renderCards = ({ item }: { item: ICard }) => {
    const navigateToMusic = () => navigation.navigate(Routes.music, item);
    return (
      <Card
        key={item.id}
        title={item.title}
        url={item.artist.picture_big}
        onPress={navigateToMusic}
      />
    );
  };

  const renderVerticalCards = ({ item }: { item: ICard }) => {
    const navigateToMusic = () => navigation.navigate(Routes.music, item);
    return (
      <Card
        size="s"
        onPress={navigateToMusic}
        key={item.id}
        horizontal
        url={item.artist.picture_big}
        description={item.artist.name}
        {...item}
      />
    );
  };

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const data = await fetch(Endpoint.tracks);
      const response = await data.json();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  if (!songs) {
    return <Loading></Loading>;
  }
  return (
    <ScrollView
      indicatorStyle="white"
      style={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.root}>
        <Header
          left={
            <Avatar
              title="Elnur Namaz"
              caption="Gold Member"
              url="https://instagram.fgyd20-2.fna.fbcdn.net/v/t51.2885-19/434881760_7598704876853941_5813968446829779647_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgyd20-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=PTANY_dAyKAAb7fuYEp&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBOpqsb7Mmy26Gdj-q3L8MeM3-249FevdnOe9tR_DysEA&oe=662DF50A&_nc_sid=8b3546"
            />
          }
          right={
            <TouchableOpacity
              activeOpacity={activeIndex}
              hitSlop={standardHitSlop}
              onPress={() => console.log("pressed")}
            >
              <RingVector color={colors.gray} />
            </TouchableOpacity>
          }
        />

        <View style={styles.search}>
          <Text numberOfLines={2} style={styles.title}>
            Listen The Latest Music
          </Text>
          <Input
            placeholder="Search Music"
            placeholderTextColor={colors.gray}
            inputStyle={{ flexGrow: 0 }}
            value={value}
            icon={<SearchVector color={colors.lightGray} />}
            setValue={setValue}
          />
        </View>
        <View style={[CommonStyles.flex, { gap: 16 }]}>
          <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
            Recently Played
          </Text>

          <FlatList
            data={data}
            horizontal
            ListEmptyComponent={
              <View>
                {loading ? (
                  <ActivityIndicator size="large" color={colors.white} />
                ) : (
                  <Text style={[styles.title, styles.cardHeader]}>
                    Loading...
                  </Text>
                )}
              </View>
            }
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={50}
            ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
            renderItem={renderCards}
          />
        </View>

        {loading ? (
          <Text style={[styles.title, styles.cardHeader]}>Loading...</Text>
        ) : (
          <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
            Recommend for you
          </Text>
        )}

        <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
          Recently Played
        </Text>
        <FlashList
          data={data}
          removeClippedSubviews
          contentContainerStyle={styles.cards}
          scrollEnabled={false}
          estimatedItemSize={50}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
          renderItem={renderVerticalCards}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    flex: 1,
    minHeight: "100%",
  },
  scrollView: {
    flex: 1,
  },
  search: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 26,
    width: "50%",
    color: colors.white,
  },
  cards: {
    paddingTop: 18,
  },
  cardHeader: {
    width: undefined,
    fontSize: 22,
    marginTop: 44,
  },
});
