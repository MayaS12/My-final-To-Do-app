import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList, Image, TouchableOpacity, } from 'react-native';
import ToDoScreen from '../components/ToDoScreen'
import firebase from 'firebase'
import { Divider } from 'react-native-elements'

export default class HomeScreen extends React.Component {
constructor(props){
    super(props)
    this.state = {
      tasks: [],
      folderName: this.props.route.params.title
    }
  }

fetchTasks = () => {
    firebase
      .database()
      .ref('/users/'+firebase.auth().currentUser.uid+'/tasks/'+'School To Do List!')
      .on('value', (snapshot) => { 
        let tasks = [];  
        if (snapshot.val()) {
          var keyTask = Object.keys(snapshot.val());
          console.log('keyTask', keyTask);
          keyTask.forEach((key) => {
            tasks.push({
              key: key,
              value: snapshot.val()[key],
            });
          });
        }
        console.log('tasks', tasks);
        this.setState({
          tasks: tasks,
          taskData: tasks.value
        });  
      });
  };

deleteTask = (task) => { var taskKey = task.key; 
console.log(taskKey); 
firebase .database() .ref( '/users/' + firebase.auth().currentUser.uid + '/tasks/' + '/School To Do List!/' + taskKey ) .remove(); };

  componentDidMount(){
    this.fetchTasks();
  }

  keyExtractor = (item, index) => {
    index.toString();
  };

  renderItem = ({ item: task }) => {
    var image;
    if(task.value.taskUrgency === 'red'){
          image = require('../assets/urgencyRed.png')
        }else if(task.value.taskUrgency === 'yellow'){
         image = require('../assets/urgencyYellow.png')
        }else{
          image = require('../assets/urgencyGreen.gif')
        }
    return(
      <View>
      <View style = {{flexDirection: "row"}}>
      <View style = {{marginLeft: 10, marginTop: 10}}>
        <View style = {{flexDirection: "row"}}>
        <Text style = {{fontWeight: "bold"}}>Task: {task.value.taskName}</Text>
          <Image source = {image} style = {{width: 30, height: 30, justifyContent: "flex-end", marginLeft: 20}}/>
        </View>
         <Text>Location: {task.value.taskLocation}</Text>
            <Text>Due Time: {task.value.taskTime}</Text>
           <Text>Start Date: {task.value.taskDate}</Text>
        </View>
        <View>
          <TouchableOpacity style = {{backgroundColor: 'white', borderRadius: 50, marginBottom: 20}} onPress = {()=>{
            this.deleteTask(task);
          }}>
            <Image source = {require('../assets/submit.png')} style = {{width: 30, height: 30, position: "absolute", marginLeft: 60}}/>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style = {{borderWidth: 2, marginTop: 10, color: 'white'}} color = "white"/>
      </View>
    );
  };    


  render(){
      var folderName = this.props.route.params.title
    console.log("folderName", folderName)
    return(
      <View style = {{flex: 1, backgroundColor: '#ffd1fc' }}>
      
        <ToDoScreen title = {this.props.route.params.title} navigation={this.props.navigation}/>
         <FlatList
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              data={this.state.tasks}
            />

             <View>
        <TouchableOpacity style = {styles.addButton} onPress = {()=>{
          this.props.navigation.navigate('AddTaskScreen', {folderName: folderName}) 
        }}>
          <Image source = {require('../assets/add.png')} style = {styles.addButtonImage}/>
        </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  addButton:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    marginLeft: 255,
     marginBottom: 20,
  },
  addButtonImage:{ 
    width: 90,
    height: 90,
    position: "absolute",
    left: 5,
    top: 4,
  },
})

