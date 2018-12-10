/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// import dependencies
import { Icon, Container, Content, Header, Segment, Body, Title, Form, Item, Label, Input, Button, Tab, Tabs, TabHeading } from 'native-base';

// import segments
import LoginSegment from '../segments/Login';
import RegisterSegment from '../segments/Register';

export default class HomeTab extends Component {

  constructor(){
    super()
    this.state = {
      segment: 'login'
    }
  }

  // static navigationOptions = {
  //     tabBarIcon: ({tintColor}) => (
  //         <Icon name="ios-mail-outline" style={{color: tintColor}} />
  //     )
  // }

  render() {
    return (
      <Container style={styles.container}>
        <Header hasTabs>
          <Body>
            <Title>Firebase Email</Title>
          </Body>
        </Header>

        <Segment>
          <Button first
            active={this.state.segment == 'login'}
            onPress={()=>this.setState({segment: 'login'})}
          >
            <Text
              style={
                this.state.segment == 'login' ? {color: '#fff'}: {color: '#0984e3'}
              }
            >LOGIN</Text>
          </Button>

          <Button last
            active={this.state.segment == 'register'}
            onPress={()=>this.setState({segment: 'register'})}
          >
            <Text
              style={
                this.state.segment == 'register' ? {color: '#fff'}: {color: '#0984e3'}
              }
            >REGISTER</Text>
          </Button>
        </Segment>

        <Content padder>
          {
            this.state.segment == 'login' && <LoginSegment />
          }
          {
            this.state.segment == 'register' && <RegisterSegment />
          }
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // padding: 10
  },
  input: {
    marginBottom: 15
  }
});
