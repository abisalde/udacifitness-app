import React from 'react';
import {View, StyleSheet, Text, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class EntryDetail extends React.Component {
  setTitle = entryId => {
    if (!entryId) {
      return;
    }

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);
    this.props.navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  };

  render() {
    const {entryId, metrics} = this.props;

    this.setTitle(entryId);
    return (
      <View>
        <Text>
          Entry Detail - {JSON.stringify(this.props.route.params.entryId)}
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state, {route}) {
  const {entryId} = route.params;
  return {
    entryId,
    metrics: state[entryId],
  };
}

function mapDispatchToProps(dispatch, {route, navigation}) {
  const {entryId} = route.params;
  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        }),
      ),
    goBack: () => navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
