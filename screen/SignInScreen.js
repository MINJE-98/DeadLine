import React from "react";
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard} from "react-native";
import firebase from "firebase";
import * as Facebook from 'expo-facebook'
import * as GoogleSignIn from 'expo-google-sign-in'
import {Default} from './fucs';

export default class SignInScreen extends React.Component {
  onLoginSuccess = () => {
    
    const userInfo = Default().UserInfo();
    const DataBase = Default().DB().ref('/Users/'+ userInfo.uid);
    DataBase.once('value').then(data =>{
      if(!data.exists()){
        DataBase.set({
          Email: userInfo.email,
        })
      }
    })
    .catch(error => alert(error))
  }
  signInWithFacebook = async() =>{
    try {
      await Facebook.initializeAsync(
        '2604738803080027',
     );
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess();
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  signInWithGoogle = async() => {
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
        this.onLoginSuccess();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }

  }
  render(){
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TouchableOpacity 
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithFacebook()}>
              <View style={styles.button}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#FFFFFF"
                  }}
                >
                  Continue with Facebook
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithGoogle()}>
              <View style={styles.googleButton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#707070"
                  }}
                >
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
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
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070"
  }
});

