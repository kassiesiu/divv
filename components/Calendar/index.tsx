import moment, { Moment } from 'moment';
import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import Day from '../Day';
import Arrows from '../Arrows';

interface CalendarProps {
  selectedDate: Moment;
  displayedDate: Moment;
  onBack: Function;
  onForward: Function;
  onPressDate: Function;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  emptyDay: {
    flex: 1,
  },
  textMonth: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default class Calendar extends React.Component<CalendarProps, any> {
  constructor(props: CalendarProps) {
    super(props);

    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    this.pressDate = this.pressDate.bind(this);
  }

  static renderWeekHeader() {
    return (
      <View style={styles.weekDays}>
        <View style={styles.weekDay}>
          <Text>Sun</Text>
        </View>
        <View style={styles.weekDay}>
          <Text>Mon</Text>
        </View>
        <View style={styles.weekDay}>
          <Text>Tue</Text>
        </View>
        <View style={styles.weekDay}>
          <Text>Wed</Text>
        </View>
        <View style={styles.weekDay}>
          <Text>Thu</Text>
        </View>
        <View style={styles.weekDay}>
          <Text>Fri</Text>
        </View>
        <View style={styles.weekDay}>
          <Text>Sat</Text>
        </View>
      </View>
    );
  }

  getDaysWithEmpty() {
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

    return <View style={styles.weekDays}>{mappedDays}</View>;
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
      <GestureRecognizer
        style={styles.container}
        onSwipeRight={this.back}
        onSwipeLeft={this.forward}
      >
        {this.renderHeader()}
        {Calendar.renderWeekHeader()}
        {this.renderWeeks()}
      </GestureRecognizer>
    );
  }
}
