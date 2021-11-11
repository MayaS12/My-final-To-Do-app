import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Platform,
  SafeAreaView,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

import AppLoading from 'expo-app-loading';

export default class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                })
                .then(function (snapshot) {});
            }
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '51758564091-du0ktb50p74fjqpf1qfmmu4o6qvkns07.apps.googleusercontent.com',
        iosClientId:
          '51758564091-b345gk5cp4rlk7sdj4rgjvg7a91kfh0p.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.appIcon}></Image>
          <Text style={styles.appTitleText}>{`To Do App!`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.signInWithGoogleAsync();
            }}>
            <Image
              style={styles.googleIcon}
              source={require('../assets/google_icon.png')}></Image>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8ef9',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: 'contain',
    marginTop: 150,
  },
  appTitleText: {
    color: 'black',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'Cochin',
    fontWeight: "bold"
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  googleText: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'Cochin',
  },
});
