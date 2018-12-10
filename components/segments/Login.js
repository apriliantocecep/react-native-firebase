/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

// import dependencies
import { Form, Item, Label, Input, Button, Toast } from 'native-base';

// // import firebse config
import * as firebase from 'firebase';

export default class LoginSegment extends Component {
  constructor(props){
    super(props)

    this.unsubscriber = null;

    this.state = {
      isAuth: false,
      email: '',
      password: '',
      userObj: null
    }
  }

  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((changeUSer)=>{
      this.setState({userObj: changeUSer})
    });

  }

  componentWillUnmount(){
    if(this.unsubscriber){
      this.unsubscriber();
    }
  }

  _onLogInUser = () => {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then((loggedinUser)=>{
      this.setState({
        userObj: loggedinUser,
        isAuth: true
      })

      console.log(loggedinUser);

      this.showToast("You are logged in")

    })
    .catch((error)=>{
      const { code, message } = error;

      // console.log(`Login fail with error: ${error}`);

      alert(message);

    });
  }

  showToast = (text) => {
    Toast.show({
      text: text,
      position: 'bottom',
      buttonText: 'OK',
    })
  }

  focusPasswordInput() {
    this._passwordInput._root.focus();
  }

  render() {
    if (!this.state.isAuth) { // AsyncStorage is beter way

      return (
        <Form style={styles.container}>

          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(email)=>this.setState({email})}
              ref={c => this._emailInput = c}
              returnKeyType="next"
              value={this.state.email}
              />
          </Item>

          <Item floatingLabel style={{marginBottom:20}}>
            <Label>Password</Label>
            <Input
              secureTextEntry
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(password)=>this.setState({password})}
              ref="passwordInput"
              returnKeyType="go"
              value={this.state.password}
              />
          </Item>

          <Button
            full
            primary
            style={styles.button}
            onPress={this._onLogInUser}
            >
            <Text style={{color:'#fff'}}>LOGIN</Text>
          </Button>

        </Form>
      );

    } else {
      return(
        <Text>Welcome, {this.state.userObj.user.email}</Text>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 20
  },
  button: {
    borderRadius:5,
    // borderWidth: 1,
    // borderColor: '#fff'
  }
});
