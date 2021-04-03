import * as React from 'react';
import moment from 'moment';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Calendar from '../components/Calendar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar selectedDate={moment()} onBack={() => {}} onForward={() => {}} />
    </SafeAreaView>
  );
}
