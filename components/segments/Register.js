/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// import dependencies
import { Form, Item, Label, Input, Button } from 'native-base';

// import firebse function
import * as firebase from 'firebase';

export default class RegisterSegment extends Component {
  constructor(props){
    super(props)

    this.unsubscriber = null;

    this.state = {
      isAuth: false,
      email: '',
      password: '',
      user: null
    }
  }

  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((changeUSer)=>{
      this.setState({user: changeUSer})
    });

  }

  componentWillUnmount(){
    if(this.unsubscriber){
      this.unsubscriber();
    }
  }

  _onSignUpUser = () => {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then((loggedinUser)=>{
      // update user state
      this.setState({
        user: loggedinUser,
        isAuth: true
      })

      console.log(loggedinUser);

    })
    .catch((error)=>{
      const { code, message } = error;

      // console.warn(`Register fail with error: ${error}`);

      if (code == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(message);
      }

    });
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
            />
          </Item>

          <Item floatingLabel style={{marginBottom:20}}>
            <Label>Password</Label>
            <Input
              secureTextEntry
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(password)=>this.setState({password})}
            />
          </Item>

          <Button
            full
            success
            style={styles.button}
            onPress={this._onSignUpUser}
          >
            <Text style={{color:'#fff'}}>REGISTER</Text>
          </Button>



        </Form>
      );

    } else {

      return(
        <Text>Welcome, {this.state.user.email}</Text>
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
