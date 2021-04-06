import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import Colors from '../../constants/Colors';

interface Props {
  value: { symbol: string };
  favorited: boolean;
  onFavorite: Function;
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgrey',
    paddingTop: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default class SearchRow extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.favorite = this.favorite.bind(this);
  }

  favorite() {
    this.props.onFavorite(this.props.value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.value.symbol}</Text>
        <Pressable onPress={this.favorite}>
          <FontAwesomeIcon
            size={20}
            color={this.props.favorited ? Colors.accentColor : 'lightgrey'}
            icon={faHeart}
          />
        </Pressable>
      </View>
    );
  }
}
