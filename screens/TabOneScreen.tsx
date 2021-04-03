import React from 'react';
import moment, { Moment } from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Text } from '../components/Themed';
import Calendar from '../components/Calendar';

interface State {
  selectedDate: Moment;
  displayedDate: Moment;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: 'white' },
});

export default class TabOneScreen extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDate: moment(),
      displayedDate: moment(),
    };

    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    this.pressDate = this.pressDate.bind(this);
  }

  back() {
    this.setState((prevState) => ({
      displayedDate: prevState.displayedDate
        .subtract(1, 'months')
        .startOf('month'),
    }));
  }

  forward() {
    this.setState((prevState: State) => ({
      displayedDate: prevState.displayedDate.add(1, 'months').startOf('month'),
    }));
  }

  pressDate(date: Moment) {
    this.setState({ selectedDate: date });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          selectedDate={this.state.selectedDate}
          displayedDate={this.state.displayedDate}
          onBack={this.back}
          onForward={this.forward}
          onPressDate={this.pressDate}
        />
        <Text>
          Selected Date:
          {this.state.selectedDate.format('MM/DD/YYYY')}
        </Text>
      </SafeAreaView>
    );
  }
}
