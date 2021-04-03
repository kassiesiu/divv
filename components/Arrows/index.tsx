import React from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pressable, StyleSheet } from 'react-native';
import { View } from '../Themed';

interface Props {
  onBack: Function;
  onForward: Function;
}

const styles = StyleSheet.create({
  arrows: {
    flexDirection: 'row',
  },
  arrowLeft: {
    marginRight: 20,
  },
});

export default class Arrows extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
  }

  back() {
    this.props.onBack();
  }

  forward() {
    this.props.onForward();
  }

  render() {
    return (
      <View style={styles.arrows}>
        <Pressable onPress={this.back}>
          <FontAwesomeIcon style={styles.arrowLeft} icon={faArrowLeft} />
        </Pressable>
        <Pressable onPress={this.forward}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Pressable>
      </View>
    );
  }
}
