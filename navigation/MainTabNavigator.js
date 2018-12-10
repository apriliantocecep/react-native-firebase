/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

// import dependencies
import { TabNavigator, TabBarBottom } from 'react-navigation';
// import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'native-base';

// Import tab
import HomeTab from '../components/mainTabNavigator/HomeTab';
import AnonimTab from '../components/mainTabNavigator/AnonimTab';
import FacebookTab from '../components/mainTabNavigator/FacebookTab';
import SettingsTab from '../components/mainTabNavigator/SettingsTab';
import SwipelistTab from '../components/mainTabNavigator/SwipelistTab';

export default class MainTabNavigator extends Component {

  static navigationOptions = {
      header: null
  }

  render() {
    return (
      <AppTabNavigator />
    );
  }
}

// switch tab active icon
tabIconSwitcher = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;

  let iconName;

  switch (routeName) {
    case "Home":
      iconName = `ios-home${focused ? '' : '-outline'}`;
    break;
    case "Anonim":
      iconName = `ios-contact${focused ? '' : '-outline'}`;
    break;
    case "Facebook":
      iconName = `logo-facebook`;
    break;
    case "Swipelist":
      iconName = `ios-list-box${focused ? '' : '-outline'}`;
    break;
    case "Settings":
      iconName = `ios-options${focused ? '' : '-outline'}`;
    break;
  }

  // You can return any component that you like here! We usually use an
  // icon component from react-native-vector-icons
  return <Icon name={iconName} color={tintColor} style={{color: tintColor}} />;
}

// register tab
const AppTabNavigator = TabNavigator({
    Home: {
        screen: HomeTab
    },
    Anonim: {
        screen: AnonimTab
    },
    Facebook: {
        screen: FacebookTab
    },
    Swipelist: {
        screen: SwipelistTab
    },
    Settings: {
        screen: SettingsTab
    },
},{
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => this.tabIconSwitcher(navigation, focused, tintColor),
    }),
    tabBarOptions: {
        style: {
            ...Platform.select({
                android: {
                    backgroundColor: '#fff'
                }
            })
        },
        activeTintColor: '#c0392b',
        inactiveTintColor: '#95a5a6',
        showLabel: true,
        showIcon: true,
    }
});

// define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLeft: {
        paddingLeft: 10,
    },
    headerRight: {
        paddingRight: 10,
    }
});
