import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default function TabThreeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>aaa</Text>
    </SafeAreaView>
  );
}
