/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ListView
} from 'react-native';

import { Icon, Container, Content, Header, Item, Input, Button, Label, List, ListItem, Body } from 'native-base';

// import firebse config
import * as firebase from 'firebase';

var data = [];

export default class SwipelistTab extends Component {
  constructor(props){
    super(props)

    this.dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newContact: ""
    }
  }

  componentDidMount(){
    var that = this

    firebase.database().ref('/contacts').on('child_added', (data)=>{
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({listViewData:newData})
    })
  }

  addRow(data) {
    var key = firebase.database().ref('/contacts').push().key
    firebase.database().ref('/contacts').child(key).set({name:data})
    // alert(data)
  }

  async deleteRow(secId,rowId,rowMap,data) {
    await firebase.database().ref('contacts/'+data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData]
    newData.splice(rowId,1)
    this.setState({listViewData:newData})
  }

  showInformation(data) {
    alert(data)

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{marginTop:StatusBar.currentHeight}}>

          <Content>
            <Item>
              <Input
                placeholder="Add item"
                onChangeText={(input)=>this.setState({newContact:input})}
              />
            <Button onPress={()=>this.addRow(this.state.newContact)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>

        </Header>

        <Content>
          <List
            enableEmptySections
            dataSource={this.dataSource.cloneWithRows(this.state.listViewData)}
            renderRow={data=>
              <ListItem>
                <Body>
                  <Text>{data.val().name}</Text>
                </Body>
              </ListItem>
            }
            renderLeftHiddenRow={data=>
              <Button full onPress={()=>this.showInformation(data)}>
                <Icon name="information-circle" />
              </Button>
            }
            renderRightHiddenRow={(data,secId,rowId,rowMap)=>
              <Button full danger onPress={()=>this.deleteRow(secId,rowId,rowMap,data)}>
                <Icon name="trash" />
              </Button>
            }
            leftOpenValue={-75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
