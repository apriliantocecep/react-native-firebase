/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// import firebse config
import * as firebase from 'firebase';

export default class FacebookTab extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user != null) {
        console.log(user)
      }
    });
  }

  _onLogInWithFacebook = () => {
    alert("Login with Facebook")
  }

  async logInWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('418725945248510', {
        permissions: ['public_profile', 'email', 'user_friends'],
      });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      //
      // Alert.alert(
      //   'Logged in!',
      //   `Hi ${(await response.json()).name}!`,
      // );

      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error);
      });

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={()=>this.logInWithFacebook()}
          style={{padding:12}}
        >
          <Text style={{fontFamily: 'Arial', color: 'white', fontSize: 17}}>Login with Facebook</Text>
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
});
