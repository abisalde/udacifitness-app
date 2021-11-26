import React from 'react';
import {View, Text} from 'react-native';

const DateHeader = ({date}) => {
  return (
    <View>
      <Text>{date}</Text>
    </View>
  );
};

export default DateHeader;
