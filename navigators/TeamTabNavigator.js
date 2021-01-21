import * as  React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeamInfoScreen from '../screen/TeamInfoScreen';
import TeamInfoStack from '../navigators/TeamInfoStack';
import GetTagScreen from '../screen/GetTagScreen';
import {Context} from '../component/context';


const AppTab = createBottomTabNavigator();
export default function TeamTabNavigator(props) {


    return(
        <Context.Provider value={props.route.params}>
            <AppTab.Navigator>
                <AppTab.Screen name="Main" component={TeamInfoStack} />
                <AppTab.Screen name="GetTag" component={GetTagScreen} />
            </AppTab.Navigator>
        </Context.Provider>

      )
}

