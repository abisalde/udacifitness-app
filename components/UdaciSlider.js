import React from 'react';
import {View, Text} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const UdaciSlider = ({max, unit, step, value, onChange}) => {
  return (
    <View>
      <MultiSlider
        sliderLength={280}
        onValuesChange={onChange}
        value={value}
        min={0}
        max={max}
        step={step}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};

export default UdaciSlider;
