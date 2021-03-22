import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import MaketeamScreen from '../screens/home/teams/make/make.screen';
import jointeamScreen from '../screens/home/teams/join/join.screen';
import homenavigator from './Home.navigator';
import { Context } from '../service/conext';
import { getTeamList } from '../controller/Home.controller';
import { get_token } from '../service/facebookfnc';


const maketeam  = connect(state => ({ islogin: state.islogin}))(MaketeamScreen);
const jointeam  = connect(state => ({ islogin: state.islogin}))(jointeamScreen);

const Stack = createStackNavigator();
export default class HomeModalNavigator extends Component{
    constructor(props){
        super(props);
        this.refresh = () =>{
            this.setState({ isload: true })
            get_token()
            .then( token => getTeamList(token, this.props))
            .then( result => this.setState({ teamlist: result}))
            .then( ()=> this.setState({ isload: false })); 
        }
        this.state = {
            teamlist: [],
            isload: true,
            refresh: this.refresh,

        }
        
    }
    render(){
        return(
            <Context.Provider value={this.state}>
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
                    <Stack.Screen name="HomeNavigator" component={homenavigator} />
                    <Stack.Screen name="maketeam" component={maketeam}/>
                    <Stack.Screen name="jointeam" component={jointeam}/>
                </Stack.Navigator>
            </Context.Provider>
        )
    }
}