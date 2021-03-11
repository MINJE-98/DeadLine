import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from '../../screens/Loding/Loading.screen'; 

const Stack = createStackNavigator();
export default class LoadingNavigation extends Component{
    render(){
        return(
            <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                        cardStyle: {
                        opacity: progress.interpolate({
                        inputRange: [0, 0.5, 0.9, 1],
                        outputRange: [0, 0.25, 0.7, 1],
                        }),
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolate: 'clamp',
                        }),
                    },
                }),
            }}
                mode="modal"
                headerMode="none"
            >
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            </Stack.Navigator>
        )
    }
}