import React from 'react';
import moment, { Moment } from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

interface CalendarProps {
  selectedDate: Moment;
  onBack: Function;
  onForward: Function;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  day: {
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
  getDaysWithEmpty() {
    const daysInMonth = this.props.selectedDate.daysInMonth();
    const firstDayOfMonth = moment(this.props.selectedDate).startOf('month');
    const lastDayOfMonth = moment(this.props.selectedDate).endOf('month');

    const emptyBeginningDays = Array(firstDayOfMonth.day()).fill(0);
    const emptyEndDays = Array(6 - lastDayOfMonth.day()).fill(0);
    const daysInBetween = Array(daysInMonth)
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

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.textMonth}>
          {this.props.selectedDate.format('MMMM')}
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

  static renderWeekHeader() {
    return (
      <View style={styles.weekDays}>
        <View style={styles.day}>
          <Text>Sun</Text>
        </View>
        <View style={styles.day}>
          <Text>Mon</Text>
        </View>
        <View style={styles.day}>
          <Text>Tue</Text>
        </View>
        <View style={styles.day}>
          <Text>Wed</Text>
        </View>
        <View style={styles.day}>
          <Text>Thu</Text>
        </View>
        <View style={styles.day}>
          <Text>Fri</Text>
        </View>
        <View style={styles.day}>
          <Text>Sat</Text>
        </View>
      </View>
    );
  }

  static renderWeek(days: number[]) {
    const mappedDays = days.map((day: number, index: number) => {
      if (!day) {
        return <View style={styles.day} key={index} />;
      }
      return (
        <View style={styles.day} key={index}>
          <Text>{day}</Text>
        </View>
      );
    });

    return <View style={styles.weekDays}>{mappedDays}</View>;
  }

  renderWeeks() {
    const daysWithEmpty = this.getDaysWithEmpty();
    const res = [];

    while (daysWithEmpty.length) {
      res.push(Calendar.renderWeek(daysWithEmpty.splice(0, 7)));
    }

    return res;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {Calendar.renderWeekHeader()}
        {this.renderWeeks()}
      </View>
    );
  }
}
