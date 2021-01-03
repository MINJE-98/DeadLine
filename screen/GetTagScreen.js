import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {Context} from '../context';

export default function GetTagScreen(props){
    const test = useContext(Context)
// 데이터를 push로 말고 넣는방법이 있나?
// 태그 별료 알림 기능 어케 구현하노?
// 어질어질하다..
  return (
    <View>
        {console.log(test)}
        <Header 
            centerComponent={{text: "팀 태그"}}
            leftComponent={{text: "생성"}}
            rightComponent={{text: "편집"}}
            containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
        }}
        />
      <Text></Text>
     </View>
 );
}