/* @flow */

// DOCS:
// - https://reactnavigation.org/

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigation from './navigation/RootNavigation';

// import firebse config
import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAB3zm5HB5iWI5CEvNceUye2OarVJj6FxA",
  authDomain: "evedia-a5917.firebaseapp.com",
  databaseURL: "https://evedia-a5917.firebaseio.com",
  projectId: "evedia-a5917",
  storageBucket: "evedia-a5917.appspot.com",
  messagingSenderId: "415344295564"
};
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <RootNavigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
