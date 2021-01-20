import * as  React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeamInfoScreen from '../screen/TeamInfoScreen';
import GetTagScreen from '../screen/GetTagScreen';
import {Context} from '../component/context';


const AppTab = createBottomTabNavigator();
export default function TeamTabNavigator() {


    return(
        <AppTab.Navigator>
            <AppTab.Screen name="TeamInfo" component={TeamInfoScreen} />
            <AppTab.Screen name="GetTag" component={GetTagScreen} />
        </AppTab.Navigator>
      )
}

