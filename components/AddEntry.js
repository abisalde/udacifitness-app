import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from '../utils/helpers';
import DateHeader from './DateHeader';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import TextButton from './TextButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {submitEntry, removeEntry} from '../utils/API';
import {addEntry} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

const AddEntry = () => {
  const dispatch = useDispatch();
  const [run, setRun] = useState(0);
  const [bike, setBike] = useState(0);
  const [swim, setSwim] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [eat, setEat] = useState(0);

  const increment = metric => {
    const {max, step} = getMetricMetaInfo(metric);
    if (metric === 'run' && run >= max) {
      return;
    }
    if (metric === 'bike' && bike >= max) {
      return;
    }
    if (metric === 'swim' && swim >= max) {
      return;
    }
    if (metric === 'run') {
      setRun(run + step);
    }
    if (metric === 'bike') {
      setBike(bike + step);
    }
    if (metric === 'swim') {
      setSwim(swim + step);
    }
  };

  const decrement = metric => {
    if (metric === 'run' && run <= 0) {
      return;
    }
    if (metric === 'bike' && bike <= 0) {
      return;
    }
    if (metric === 'swim' && swim <= 0) {
      return;
    }
    if (metric === 'run') {
      setRun(run - getMetricMetaInfo(metric).step);
    }
    if (metric === 'bike') {
      setBike(bike - getMetricMetaInfo(metric).step);
    }
    if (metric === 'swim') {
      setSwim(swim - getMetricMetaInfo(metric).step);
    }
  };

  const slide = (metric, value) => {
    if (metric === 'sleep') {
      setSleep(value);
    }
    if (metric === 'eat') {
      setEat(value);
    }
  };

  const submit = () => {
    const key = timeToString();
    const entry = {
      run,
      bike,
      swim,
      sleep,
      eat,
    };

    dispatch(addEntry({[key]: entry}));

    setRun(0);
    setBike(0);
    setSwim(0);
    setSleep(0);
    setEat(0);

    // Navigate to Homef

    submitEntry({key, entry});

    // Clear Local Notifications
  };

  const reset = () => {
    const key = timeToString();

    dispatch(addEntry({[key]: getDailyReminderValue()}));
    /*
    TODO: 
        Update Redux store
        Route to Home
        
    */
    removeEntry(key);
  };

  const alreadyLogged = () => {
    const key = timeToString();
    const entry = useSelector(state => state.entry[key].today);
    if (entry) {
      return true;
    }
    return false;
  };

  if (alreadyLogged) {
    return (
      <View>
        <Icon name="ios-happy-outline" size={100} color="black" />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    );
  }

  const metaInfo = getMetricMetaInfo();
  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />

      {Object.keys(metaInfo).map(key => {
        const {getIcon, type, ...rest} = metaInfo[key];

        return (
          <View key={key}>
            {getIcon()}
            {type === 'slider' ? (
              <UdaciSlider
                value={key === 'sleep' ? sleep : key === 'eat' ? eat : 0}
                onChange={value => slide(key, value)}
                {...rest}
              />
            ) : (
              <UdaciSteppers
                value={
                  key === 'run'
                    ? run
                    : key === 'bike'
                    ? bike
                    : key === 'swim'
                    ? swim
                    : 0
                }
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
      <TextButton onPress={submit}>SUBMIT</TextButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default AddEntry;
