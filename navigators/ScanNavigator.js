import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScanScreen from '../screen/ScanScreen';
import ListAddScreen from '../screen/ListAddScreen';


const ScanStack = createStackNavigator();
export default class AuthNavigator extends React.Component {
  render(){
    return(
      <ScanStack.Navigator>
          <ScanStack.Screen name="상품 스캔" component={ScanScreen} />
          <ScanStack.Screen name="상품 추가" component={ListAddScreen} />
      </ScanStack.Navigator>
    )
  }
}
