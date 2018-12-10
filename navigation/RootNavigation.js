/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

// Import Screen
import MainTabNavigator from './MainTabNavigator';

// import Root native base
// https://docs.nativebase.io/Components.html#Toast
import { Root } from "native-base";

export default class RootNavigation extends Component {
  render() {
    return (
      <Root>
        <AppStackNavigator />
      </Root>
    );
  }
}

const AppStackNavigator = StackNavigator({
  Main: {
    screen: MainTabNavigator
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
