import React from 'react';
import moment, { Moment } from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Pressable, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Text, View } from '../Themed';
import Day from '../Day';

interface CalendarProps {
  selectedDate: Moment;
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
  arrows: {
    flexDirection: 'row',
  },
  arrowLeft: {
    marginRight: 20,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
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
    const firstDayOfMonth = moment(this.props.selectedDate).startOf('month');
    const lastDayOfMonth = moment(this.props.selectedDate).endOf('month');

    const emptyBeginningDays = Array(firstDayOfMonth.day()).fill(0);
    const emptyEndDays = Array(6 - lastDayOfMonth.day()).fill(0);
    const daysInBetween = Array(this.props.selectedDate.daysInMonth())
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

  pressDate(day: number) {
    this.props.onPressDate(day);
  }

  renderWeek(days: number[]) {
    const mappedDays = days.map((day: number) => (
      <Day
        day={day}
        selected={this.props.selectedDate.date() === day}
        onPress={this.pressDate}
      />
    ));

    return <View style={styles.weekDays}>{mappedDays}</View>;
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.textMonth}>
          {this.props.selectedDate.format('MMMM YYYY')}
        </Text>
        <View style={styles.arrows}>
          <Pressable onPress={this.back}>
            <FontAwesomeIcon style={styles.arrowLeft} icon={faArrowLeft} />
          </Pressable>
          <Pressable onPress={this.forward}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Pressable>
        </View>
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
