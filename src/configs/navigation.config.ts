import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
  safe: {
    flex: 1,
  },
});

export const mainNavigationOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: styles.container,
  animation: 'slide_from_left',
};