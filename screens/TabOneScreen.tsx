import React from 'react';
import moment, { Moment } from 'moment';
import Calendar from '../components/Calendar';
import { Text, View } from '../components/Themed';

interface State {
  selectedDate: Moment;
  displayedDate: Moment;
}

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
      <View>
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
      </View>
    );
  }
}
