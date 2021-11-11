import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Platform, SafeAreaView, TouchableOpacity, Image, FlatList, Button } from 'react-native';
import firebase from 'firebase'; 

export default class ToDoScreen extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
        <View style = {styles.background}>
        
      <SafeAreaView style = {styles.androidSafeArea}/>
        <View style = {styles.titleContainer}>
        <Text style = {styles.title}>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background:{
    flex: 0.25,
    backgroundColor: '#ffd1fc'
  },
  androidSafeArea:{
    marginTop: Platform.OS === 'android'?StatusBar.currentHeight:0
  },
  titleContainer:{
    alignItems: "center",
  },
  title:{
    fontSize: 35,
    marginTop: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
})

