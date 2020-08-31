import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

import {firebaseConfig} from './config'
import AuthNavigator from './navigators/AuthNavigator'; 
import TabNavigator from './navigators/TabNavigator';
firebase.initializeApp(firebaseConfig)

const AppStack = createStackNavigator();

// React.useEffect(()=>{
//   firebase.auth().onAuthStateChanged( userInfo =>{
//     setuserInfo(userInfo);
//   })
// })
export default class App extends React.Component {
  state = {userInfo: null}
  componentDidMount = () =>{
    firebase.auth().onAuthStateChanged( userInfo => this.setState({userInfo: userInfo}))
  }
  render(){
    return(
      <NavigationContainer>
        <AppStack.Navigator>
          { this.state.userInfo != null 
            ? (<><AppStack.Screen name="App" component={TabNavigator} options={{title: "DeadLine", headerShown: false}}/></>)
            : (<><AppStack.Screen name="Auth" component={AuthNavigator} options={{title: "DeadLine"}}/></>)
          }
        </AppStack.Navigator>
      </NavigationContainer>
  )
  }
}