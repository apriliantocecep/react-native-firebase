/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// import dependencies
import { Icon, Container, Content, Header, Body, Title, Button, H3, H1 } from 'native-base';

// import firebse function
import * as firebase from 'firebase';

export default class AnonimTab extends Component {
  constructor(props){
    super(props)

    this.state = {
      isAuth: false,
    }
  }

  _onAnonimLogin = () => {
    firebase.auth().signInAnonymouslyAndRetrieveData()
    .then((user) => {
      console.log(user);

      this.setState({
        isAuth: true
      });

    })
    .catch((error)=>{
      console.log(`Login failed. Error = ${error}`);
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={{
            borderRadius:5,
            alignItems: 'center',
            backgroundColor: '#e74c3c',
            padding:7,
            flexDirection:'row',
            paddingHorizontal:10
          }}
          onPress={this._onAnonimLogin}
        >
          <Icon name="ios-contact" style={{color:'#fff',marginRight:10}} />
          <Text style={{color:'#fff',fontSize:17}}>Login as Anonimusly</Text>
        </TouchableOpacity>

        <Text style={{textAlign:'center', marginTop:20}}>
          {this.state.isAuth==true? <H3>Logged in as Anonim</H3>:''}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});
