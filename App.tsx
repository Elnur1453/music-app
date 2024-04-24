import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "./src/theme/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Router from "./src/router/router";
import { Avatar } from "./src/components/Avatar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"), // 400
    "Nunito-Bold": require("./assets/fonts/Nunito-SemiBold.ttf"), // 600
  });

  const onLayoutRootView = async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <Router />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
  safe: {
    flex: 1,
  },
});
