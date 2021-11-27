/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers';
import {purple, white} from './utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={styles.container}>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                  let icon;
                  if (route.name === 'History') {
                    icon = (
                      <Icon name="ios-bookmarks" size={20} color={color} />
                    );
                  } else if (route.name === 'AddEntry') {
                    icon = (
                      <FontAwesome5
                        name="plus-square"
                        size={20}
                        color={color}
                      />
                    );
                  }
                  return icon;
                },
                tabBarActiveTintColor: Platform.OS === 'ios' ? purple : white,
                tabBarStyle: {
                  backgroundColor: Platform.OS === 'ios' ? white : purple,
                  height: 70,
                  shadowColor: 'rgba(0, 0, 0, 0.24)',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 6,
                  shadowOpacity: 1,
                },
                tabBarIndicatorStyle: {
                  backgroundColor: 'yellow',
                },
              })}>
              <Tab.Screen name="History" component={History} />
              <Tab.Screen name="AddEntry" component={AddEntry} />
            </Tab.Navigator>
          </View>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
