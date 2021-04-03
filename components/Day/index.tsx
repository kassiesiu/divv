import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '../Themed';

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
    color: 'red',
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
    return (
      <Pressable style={[styles.day]} onPress={this.press}>
        <Text style={this.props.selected && styles.selected}>
          {this.props.day}
        </Text>
      </Pressable>
    );
  }
}
