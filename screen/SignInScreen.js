import React, { useEffect, useState } from "react";
import {AsyncStorage ,View,Text,StyleSheet,SafeAreaView,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard,ActivityIndicator, Modal} from "react-native";
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import LoadingScreen from '../component/Loading';
import { SocialIcon } from 'react-native-elements'
import { Platform } from "react-native";
// firebase local != null ? onAuthstatechanged : onLoginSuccess
// firebase LOCAL로 저장될 경우 onAuthstatechanged로 로그인 체크를 할 수 있다.
// 
export default function SignInScreen(){
  const [modalVisible, setmodalVisible] = useState(true);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged( () =>{
      setmodalVisible(false);
    })
    
  }, [])

// const ReadData = async () =>{
//   try {
//     const value = await AsyncStorage.getItem('UserInfo');
//     if(value != null){
//       ModalControl()
//     }
//     return 0;
//   } catch (error) {
//     alert(error)
//     return 0;
//   }
// };
// const SaveData = async data => {
//   try {
//     await AsyncStorage.setItem(
//      'UserInfo', JSON.stringify(data)
//     );
//     return 0;
//   } catch (error) {
//     alert(error)
//     return 0;
//   }
// };
//   const ModalControl = () =>{
//     setmodalVisible(!modalVisible);
//     setTimeout(() => {
//       setmodalVisible(false);
//     }, 10000);
//   }
  const onLoginSuccess = () => {
    const userInfo = firebase.auth().currentUser;
    const DataBase = firebase.database().ref('/Users/'+ userInfo.uid);
    DataBase.once('value').then(data =>{
      if(!data.exists()){
        DataBase.set({
          Name: userInfo.displayName,
          Email: userInfo.email,
        })
      }
    })
    .catch(error => alert(error))
    // SaveData(userInfo)
  }
  const signInWithFacebook = async() =>{
    try {
      await Facebook.initializeAsync(
        '2604738803080027',
     );
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        setmodalVisible(true);
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInWithCredential(credential);
        onLoginSuccess();
      }
      return 0;
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      return 0;
    }
  }
  const signInWithGoogle = async() => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      await GoogleSignIn.initAsync({
        clientId: '22858651573-hpkrtu8i3hn0cku3glv63s59nhpk90cm.apps.googleusercontent.com',
      });
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken);
        // Sign in with credential from the Google user.
        await firebase.auth().signInWithCredential(credential)
        onLoginSuccess();
      }
      return 0;
    } catch ({ message }) {
      alert('login: Error:' + message);
      return 0;
    }

  }

    return (
      <View style={styles.container}>
        <SocialIcon title="페이스북으로 시작하기" style={styles.button} button={true} type="facebook" onPress={signInWithFacebook} />
        <SocialIcon title="구글로 시작하기"style={styles.button} button={true} type="google" onPress={signInWithGoogle}/>
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <LoadingScreen />
        </Modal>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center'
  },
  form: {
    width: "86%",
    marginTop: 15
  },
  logo: {
    marginTop: 20
  },
  input: {
    fontSize: 20,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5
  },
  button:{
    width: "90%"
  },
  Loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

