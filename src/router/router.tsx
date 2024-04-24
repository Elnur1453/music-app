import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "./Routes";
import { mainNavigationOptions } from "../configs/navigation.config";
import { TabRouter } from "./Tab.Router";

const Stack = createNativeStackNavigator();

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.tab}
        screenOptions={mainNavigationOptions}
      >
        <Stack.Screen name={Routes.tab} component={TabRouter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
