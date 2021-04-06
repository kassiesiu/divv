import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { View } from '../Themed';

interface Props {
  value: string;
  placeholder: string;
  onSearch: Function;
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 15,
    flexDirection: 'row',
    borderRadius: 30,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
  },
});

export default class Search extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search(value: string) {
    this.props.onSearch(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <FontAwesomeIcon
          style={styles.icon}
          size={28}
          color="grey"
          icon={faSearch}
        />
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={this.search}
        />
      </View>
    );
  }
}
