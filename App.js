/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers';
import {purple, white} from './utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import EntryDetail from './components/EntryDetail';

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const UdaciStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === 'History') {
            icon = <Icon name="ios-bookmarks" size={20} color={color} />;
          } else if (route.name === 'AddEntry') {
            icon = <FontAwesome5 name="plus-square" size={20} color={color} />;
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
      <Tab.Screen
        name="History"
        component={History}
        options={{tabBarLabel: 'History'}}
      />
      <Tab.Screen
        name="AddEntry"
        component={AddEntry}
        options={{tabBarLabel: 'Add Entry'}}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EntryDetail"
        component={EntryDetail}
        options={{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={styles.container}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
            <MainNavigation />
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

  statusBar: {
    height: 26,
  },
});
