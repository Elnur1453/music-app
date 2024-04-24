import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "./Routes";
import { HomeScreen } from "../screens/Home.Screen";
import { MusicScreen } from "../screens/Music.Screen";
import { FavoriteScreen } from "../screens/Favorite.Screen";
import { colors } from "../theme/colors";
import HomeVector from "../../assets/vectors/home.svg";
import LikeVector from "../../assets/vectors/heart.svg";
import MusicVector from "../../assets/vectors/music.svg";
const Tab = createBottomTabNavigator();

export const TabRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{ backgroundColor: colors.dark }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeVector color={focused ? colors.primary : colors.lightGray} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <LikeVector color={focused ? colors.primary : colors.lightGray} />
          ),
        }}
      />
      <Tab.Screen
        name="Music"
        component={MusicScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MusicVector color={focused ? colors.primary : colors.lightGray} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    height: 85,
    backgroundColor: colors.dark,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: "#A8BACF",
    shadowOffset: {
      width: 2,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    borderTopWidth: 0,
  },
});
