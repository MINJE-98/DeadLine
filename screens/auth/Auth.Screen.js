import React, { Component } from "react";
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";

import { signInWithFacebook } from './Auth.controller';

export default class SignInScreen extends Component{
  render(){
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TouchableOpacity 
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => signInWithFacebook(this.props)}>
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
            {/* <TouchableOpacity 
              style={{ width: "86%", marginTop: 10 }}
              // onPress={() => this.signInWithGoogle()}
              >
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
            </TouchableOpacity> */}
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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

