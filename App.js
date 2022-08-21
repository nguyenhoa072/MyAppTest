/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type { Node } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { View, Button } from 'react-native';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App: () => Node = () => {
    GoogleSignin.configure({
        webClientId:
            '256408849779-j4lkku6suka4pt9aq3782vpe86he5d9r.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential);

        user_sign_in
            .then(user => {
                console.log('user', user);
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    const logOut = async () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
    }

    useEffect(() => {
        // To hide splash screen
        SplashScreen.hide();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                onPress={onGoogleButtonPress}
                title="Sign in with Google"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={logOut}
                title="Signing out"
                color="#ff0000"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
};

export default App;
