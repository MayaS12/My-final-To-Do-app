import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import MainScreen from '../screens/MainScreen'
import SchoolScreen from '../screens/SchoolScreen'
import ClassScreen from '../screens/ClassScreen'
import HomeScreen from '../screens/HomeScreen'
import AddTaskScreen from '../screens/AddTaskScreen'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName = 'MainScreen' screenOptions = {{headerShown: false}}>
          <Stack.Screen name = 'MainScreen' component = {MainScreen}/>
          <Stack.Screen name = 'HomeScreen' component = {HomeScreen}/>
          <Stack.Screen name = 'SchoolScreen' component = {SchoolScreen}/>
          <Stack.Screen name = 'ClassScreen' component = {ClassScreen}/>
          <Stack.Screen name = 'AddTaskScreen' component = {AddTaskScreen}/>
        </Stack.Navigator>
    )
  }

export default StackNavigator

