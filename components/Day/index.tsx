import { Moment } from 'moment';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Text, View } from '../Themed';

interface Props {
  date: Moment;
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
    backgroundColor: Colors.accentColor,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Day extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.press = this.press.bind(this);
  }

  press() {
    this.props.onPress(this.props.date);
  }

  render() {
    return (
      <Pressable style={styles.day} onPress={this.press}>
        <View style={this.props.selected && styles.selected}>
          <Text>{this.props.date.date()}</Text>
        </View>
      </Pressable>
    );
  }
}
