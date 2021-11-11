import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';

export default class MainScreen extends React.Component {
  render(){
    return(
      <View style = {styles.background}>
      <SafeAreaView style = {styles.androidSafeArea}/>
        <View style = {styles.titleContainer}>
        <Text style = {styles.title}>To - do list!</Text>
        </View>

        <TouchableOpacity style = {styles.button} onPress = {()=>{
          this.props.navigation.navigate('HomeScreen', {title: 'Home To - Do List!'})
        }}>
          <Image source = {require('../assets/home.png')} style = {styles.buttonImage}/>
          <Text style = {styles.buttonFont}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {()=>{
          this.props.navigation.navigate('ClassScreen', {title: 'Classes To - Do List!'})
        }}>
          <Image source = {require('../assets/class.png')} style = {styles.buttonImage}/>
          <Text style = {styles.buttonFont}>Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {()=>{
          this.props.navigation.navigate('SchoolScreen', {title: 'School To Do List!'})
        }}>
          <Image source = {require('../assets/school.png')} style = {styles.buttonImage}/>
          <Text style = {styles.buttonFont}>School</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: '#ffd1fc'
  },
  androidSafeArea:{
    marginTop: Platform.OS === 'android'?StatusBar.currentHeight:0
  },
  titleContainer:{
    flex: 0.5,
    alignItems: "center",
  },
  title:{
    fontSize: 40,
    marginTop: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  button:{
    width: 300,
    height: 100,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 70
  },
  buttonImage:{
    width: 100,
    height: 95,
    position: "absolute",
    left: 20
  },
  buttonFont:{
    fontWeight: "bold",
    fontFamily: 'Cochin',
    fontSize: 39,
    marginLeft: 150
  }
})

