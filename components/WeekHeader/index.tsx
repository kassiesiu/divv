import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});

export default function MonoText() {
  return (
    <View style={styles.container}>
      <View style={styles.weekDay}>
        <Text>Sun</Text>
      </View>
      <View style={styles.weekDay}>
        <Text>Mon</Text>
      </View>
      <View style={styles.weekDay}>
        <Text>Tue</Text>
      </View>
      <View style={styles.weekDay}>
        <Text>Wed</Text>
      </View>
      <View style={styles.weekDay}>
        <Text>Thu</Text>
      </View>
      <View style={styles.weekDay}>
        <Text>Fri</Text>
      </View>
      <View style={styles.weekDay}>
        <Text>Sat</Text>
      </View>
    </View>
  );
}
