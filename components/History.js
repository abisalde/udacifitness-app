import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addEntry, receiveEntries} from '../redux/actions';
import {timeToString, getDailyReminderValue} from '../utils/helpers';
import {fetchCalendarResults} from '../utils/API';
import {Agenda as UdacitFitnessCalendar} from 'react-native-calendars';
import {white} from '../utils/colors';
import MetricCard from './MetricCard';
import LoadingApp from './Loading';

class History extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({entries}) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            }),
          );
        }
      })
      .then(() => this.setState(() => ({ready: true})));
  }

  renderItem = ({today, ...metrics}, formattedDate, key) => {
    return (
      <View style={styles.item}>
        {today ? (
          <View>
            <Text style={styles.noDataText}>{JSON.stringify(today)}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EntryDetail', {entryId: key})
            }>
            <MetricCard metrics={metrics} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderEmptyDate() {
    return (
      <View style={styles.item}>
        <Text style={styles.noDataText}>
          You didn't log any data on this date
        </Text>
      </View>
    );
  }
  render() {
    const {entries} = this.props;
    const {ready} = this.state;
    if (!ready) {
      return <LoadingApp />;
    }
    return (
      <UdacitFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 32,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps)(History);
