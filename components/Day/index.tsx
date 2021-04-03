import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

interface DayProps {
  day: number;
  selected: boolean;
  onPress: Function;
}

const styles = StyleSheet.create({
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  selected: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Day extends React.Component<DayProps, any> {
  constructor(props: DayProps) {
    super(props);

    this.press = this.press.bind(this);
  }

  press() {
    this.props.onPress(this.props.day);
  }

  render() {
    return this.props.day ? (
      <Pressable style={styles.day} onPress={this.press}>
        <View style={this.props.selected && styles.selected}>
          <Text>{this.props.day}</Text>
        </View>
      </Pressable>
    ) : (
      <View style={styles.day} />
    );
  }
}
