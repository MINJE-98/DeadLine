import React, { useEffect, useState } from "react";
import { View,StyleSheet, Modal } from "react-native";
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import {LoadingScreen} from '../component/Loading';
import { SocialIcon } from 'react-native-elements'


export default function SignInScreen(){
  const [modalVisible, setmodalVisible] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const userDB = firebase.database().ref('/Users/');

  useEffect(()=>{
     firebase.auth().onAuthStateChanged( userdata =>{
      userdata && setUserInfo(userdata)
      setmodalVisible(false)
    })
  }, [])

  function onLoginSuccess() {
    userDB
    .once('value')
    .child(userInfo.uid)
    .then(data =>{
      if(!data.exists()){
        userDB
        .child(userInfo.uid)
        .set({
          Name: userInfo.displayName,
          Email: userInfo.email,
          Photo: userInfo.photoURL
        })
      }
    })
    .then(setmodalVisible(false))
    .catch(error => alert(error))
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

