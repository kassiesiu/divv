import moment, { Moment } from 'moment';
import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import Day from '../Day';
import Arrows from '../Arrows';
import WeekHeader from '../WeekHeader';

interface Props {
  selectedDate: Moment;
  displayedDate: Moment;
  onBack: Function;
  onForward: Function;
  onPressDate: Function;
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyDay: {
    flex: 1,
  },
  textMonth: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default class Calendar extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    this.pressDate = this.pressDate.bind(this);
  }

  getDaysWithEmpty(): number[] {
    const { displayedDate } = this.props;

    const firstDayOfMonth = moment(displayedDate).startOf('month');
    const lastDayOfMonth = moment(displayedDate).endOf('month');

    const emptyBeginningDays = Array(firstDayOfMonth.day()).fill(0);
    const emptyEndDays = Array(6 - lastDayOfMonth.day()).fill(0);
    const daysInBetween = Array(displayedDate.daysInMonth())
      .fill('')
      .map((_, index) => index + 1);

    return [...emptyBeginningDays, ...daysInBetween, ...emptyEndDays];
  }

  back() {
    this.props.onBack();
  }

  forward() {
    this.props.onForward();
  }

  pressDate(date: Moment) {
    this.props.onPressDate(date);
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.textMonth}>
          {this.props.displayedDate.format('MMMM YYYY')}
        </Text>
        <Arrows onBack={this.back} onForward={this.forward} />
      </View>
    );
  }

  renderWeek(days: number[]) {
    const { selectedDate, displayedDate } = this.props;
    const mappedDays = days.map((day: number) =>
      day ? (
        <Day
          date={moment(displayedDate.set('date', day))}
          selected={
            selectedDate.month() === displayedDate.month() &&
            selectedDate.year() === displayedDate.year() &&
            selectedDate.date() === day
          }
          onPress={this.pressDate}
        />
      ) : (
        <View style={styles.emptyDay} />
      )
    );

    return <View style={styles.week}>{mappedDays}</View>;
  }

  renderWeeks() {
    const daysWithEmpty = this.getDaysWithEmpty();
    const weeks = [];

    while (daysWithEmpty.length) {
      weeks.push(this.renderWeek(daysWithEmpty.splice(0, 7)));
    }

    return weeks;
  }

  render() {
    return (
      <GestureRecognizer onSwipeRight={this.back} onSwipeLeft={this.forward}>
        {this.renderHeader()}
        <WeekHeader />
        {this.renderWeeks()}
      </GestureRecognizer>
    );
  }
}
