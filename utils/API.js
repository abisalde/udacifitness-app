import AsyncStorage from '@react-native-async-storage/async-storage';
import {CALENDAR_STORAGE_KEY} from './_calendar';

export const submitEntry = async ({entry, key}) => {
  return await AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: entry,
    }),
  );
};

export const removeEntry = async key => {
  return await AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
};
