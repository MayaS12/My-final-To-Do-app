import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import { RadioButton } from 'react-native-paper';

export default class AddTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskLocation: '',
      taskDate: '',
      taskTime: '',
      taskUrgency: '',
      checked: 'green',
      urgencyColor: '',
      folderName: this.props.route.params.folderName,  
    };
  }

  addTask = () => {
    firebase.database().ref('/users/'+firebase.auth().currentUser.uid+'/tasks/'+this.state.folderName+'/'+Math.random().toString(36).slice(2)).set({
      taskName: this.state.taskName,  
      taskLocation: this.state.taskLocation,
      taskDate: this.state.taskDate,
      taskTime: this.state.taskTime,
      taskUrgency: this.state.checked
    })
  }

  render() {
    return (
      <View style={styles.background}>
        <SafeAreaView style={styles.androidSafeArea} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add task!</Text>
        </View>

        <KeyboardAvoidingView>
       
         <ScrollView>
          <TextInput
            placeholder="Task Name"
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({
                taskName: text,
              });
            }}></TextInput>

          <TextInput
            placeholder="Task Location, ie; school, dance center, football field"
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({
                taskLocation: text,
              });
            }}></TextInput>

          <TextInput
            placeholder="Task Date, ie; 20/10/2021"
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({
                taskDate: text,
              });
            }}></TextInput>

          <TextInput
            placeholder="Task Deadline, ie; 5:00PM"
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({
                taskTime: text,
              });
            }}></TextInput>
                
          <Text style={styles.urgencyTitle}>Urgency</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={
                this.state.urgencyColor === 'red'
                  ? [styles.urgencyButton1, { backgroundColor: 'red' }]
                  : [styles.urgencyButton1, { backgroundColor: 'white' }] 
              }
              onPress={() => {  
                this.setState({
                  checked: 'red',
                  urgencyColor: 'red',
                });
              }}>
              <Text style = {styles.urgencyText1}>DO IT NOW!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={this.state.urgencyColor === 'yellow'
                  ? [styles.urgencyButton2, { backgroundColor: 'yellow' }]
                  : [styles.urgencyButton2, { backgroundColor: 'white' }] }
              onPress={() => {
                this.setState({
                  checked: 'yellow',
                  urgencyColor: 'yellow',
                });
              }}>
              <Text style = {styles.urgencyText2}>I have time but I should probably do it soon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={this.state.urgencyColor === 'green'
                  ? [styles.urgencyButton3, { backgroundColor: 'green' }]
                  : [styles.urgencyButton3, { backgroundColor: 'white' }] }
              onPress={() => {
                this.setState({
                  checked: 'green',
                  urgencyColor: 'green',
                });
              }}> 
              <Text style = {styles.urgencyText3}>I have all the time in the world</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton} onPress = {()=>{
            this.addTask();
            this.props.navigation.navigate('MainScreen')
          }}>
              <Image
                source={require('../assets/submit.png')}
                style={styles.addButtonImage}
              />
            </TouchableOpacity> 
            </ScrollView>          
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {   
    flex: 1,
    backgroundColor: '#ffd1fc',
  },
  androidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    alignItems: 'center',
  },  
  title: {
    fontSize: 40,    
    marginTop: 20,
    fontFamily: 'Cochin',   
    fontWeight: 'bold',
  },
  inputText: {
    width: 350,     
    height: 50,
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 20,
    marginBottom: 40,
  },
  urgencyTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
    marginBottom: 20,    
  },
  urgencyButton1: {
    width: 105,
    height: 105,
    borderRadius: 50,
    marginLeft: 10,
  },
  urgencyButton2: {
    width: 105,
    height: 105,
    borderRadius: 50,
    marginLeft: 20,
  },
  urgencyButton3: {
    width: 105,
    height: 105,
    borderRadius: 50,
    marginLeft: 20,
  },
  urgencyText1:{
    fontFamily: 'Cochin',
    fontSize: 14,
    marginTop: 40,
    marginLeft: 5,  
    textAlign: "center",
    color: 'black',
  },
  urgencyText2:{
    fontFamily: 'Cochin',  
    fontSize: 13.7,   
    marginTop: 27,           
    textAlign: "center",
    color: 'black',
  },
  urgencyText3:{
    fontFamily: 'Cochin',
    fontSize: 13.7,
    marginTop: 35,        
    textAlign: "center",
    color: 'black',
  },
  addButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'white',
    marginLeft: 270,
    marginTop: 20,     
  },
  addButtonImage: {
    width: 90,
    height: 86,
    position: 'absolute',
    top: 4,
  },
});
