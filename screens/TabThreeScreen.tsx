import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXPO_IEXCLOUD_API_KEY, EXPO_IEXCLOUD_URL } from '@env';
import { Text, View } from '../components/Themed';
import Search from '../components/Search';
import SearchRow from '../components/SearchRow';

interface State {
  searchValue: string;
  searchResults: { symbol: string }[];
  list: { symbol: string }[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});

export default class TabThreeScreen extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchValue: '',
      searchResults: [],
      list: [],
    };
    this.search = this.search.bind(this);
    this.favorite = this.favorite.bind(this);
  }

  search(value: string) {
    if (!value) {
      this.setState({
        searchValue: value,
        searchResults: [],
      });

      return;
    }

    fetch(
      // `${EXPO_IEXCLOUD_URL}/stock/T/dividends/next?token=${EXPO_IEXCLOUD_API_KEY}`
      `${EXPO_IEXCLOUD_URL}/search/${value}?token=${EXPO_IEXCLOUD_API_KEY}`
    )
      .then((response) => response.json())
      .then((results) => {
        this.setState({
          searchResults: results,
        });
      });

    this.setState({
      searchValue: value,
    });
  }

  favorite(value: { symbol: string }) {
    const index = this.state.list.findIndex(
      (item) => item.symbol === value.symbol
    );

    if (index === -1) {
      this.setState((prevState) => ({
        list: [...prevState.list, value],
      }));
    } else {
      this.setState((prevState) => {
        const newList = [...prevState.list];
        newList.splice(index, 1);
        return { list: newList };
      });
    }
  }

  renderSearchResults() {
    return (
      <View>
        {this.state.searchResults.map((stock: { symbol: string }) => (
          <SearchRow
            value={stock}
            favorited={
              !!this.state.list.find((item) => item.symbol === stock.symbol)
            }
            onFavorite={this.favorite}
          />
        ))}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Search
          placeholder="hello"
          value={this.state.searchValue}
          onSearch={this.search}
        />
        {this.renderSearchResults()}
      </SafeAreaView>
    );
  }
}
