import React from 'react';
import moment, { Moment } from 'moment';
import Calendar from '../components/Calendar';

interface State {
  selectedDate: Moment;
}

export default class TabOneScreen extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDate: moment(),
    };

    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    this.pressDate = this.pressDate.bind(this);
  }

  back() {
    this.setState((prevState) => ({
      selectedDate: prevState.selectedDate
        .subtract(1, 'months')
        .startOf('month'),
    }));
  }

  forward() {
    this.setState((prevState: State) => ({
      selectedDate: prevState.selectedDate.add(1, 'months').startOf('month'),
    }));
  }

  pressDate(day: number) {
    this.setState((prevState: State) => ({
      selectedDate: prevState.selectedDate.set('date', day),
    }));
  }

  render() {
    return (
      <Calendar
        selectedDate={this.state.selectedDate}
        onBack={this.back}
        onForward={this.forward}
        onPressDate={this.pressDate}
      />
    );
  }
}
