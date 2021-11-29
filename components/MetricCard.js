import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getMetricMetaInfo} from '../utils/helpers';
import {gray, white} from '../utils/colors';

const MetricCard = ({metrics}) => {
  return (
    <View style={styles.container}>
      {Object.keys(metrics).map(metric => {
        const {getIcon, displayName, unit} = getMetricMetaInfo(metric);
        return (
          <View key={metric} style={[styles.metric]}>
            {getIcon()}
            <View style={styles.metricInfo}>
              <Text style={{fontSize: 20}}>{displayName}</Text>
              <Text style={{fontSize: 16, color: gray}}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: white,
    shadowRadius: 5,
  },
  metric: {
    flexDirection: 'row',
    marginTop: 12,
  },
});

export default MetricCard;
