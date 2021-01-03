import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, SectionList } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import {Context} from '../context';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function TeamScreen(props){
  const {TeamName, TeamUid} = useContext(Context);
  const [Items, setItems] = useState(null);
  const [Itemstemp, setItemstemp] = useState(null);
    useEffect(()=>{
      if(!Items) getitems()
    })
    const getitems = () =>{
      firebase.database().ref('Teams/' + TeamUid + '/TeamItems').once('value').then( Data =>{
        let list = []
        Data.forEach( a =>{
          list.push({title: a.key, data: Object.keys(a.val())})
        })
        setItems(list);
        setItemstemp(Data.val());
      })
    }
    // 1 , 880
    // 1 , 881
    // 2 , 882
    const getItemsTemp = (date, barcode) =>{
      // Object.keys(Itemstemp).find( key => {if(key === date) Object.keys(Itemstemp[key]).find( code => {if(code === barcode) console.log(Itemstemp[key[code]]);})})
      console.log(Iem);
    }
  return (
    <View>
      {console.log(Itemstemp)}
    <Header 
      leftComponent={<Icon name='navigate-before' color='#000' onPress={()=> props.navigation.navigate('Home')}/> } 
      centerComponent={<View style={{alignItems: "center"}}><Text>{TeamName}</Text><Text style={{fontSize: 10, color: "#808080"}}>{TeamUid}</Text></View>}
      rightComponent={<Icon name='add' color='#000' onPress={()=> props.navigation.navigate('ScanStack', {TeamUid: TeamUid})} />}
      containerStyle={{
        backgroundColor: '#fff',
        justifyContent: 'space-around',
      }}
      />
      <SafeAreaView>
        <SwipeListView
        useSectionList
        style={{width: "100%", height: "100%"}}
        sections={Items}
        renderItem={({section: { title }, item}) => <Text>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text>{title}</Text>
        )}
        />
      </SafeAreaView>
    </View>
  );
}

  
const styles = StyleSheet.create({
  Scanner:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1
  },
  shape:{
    position: 'absolute',
    flex: 1,
    marginTop: "10%",
    marginLeft: "2%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    profile:{
      backgroundColor: "black",
      width: 100,
      height: 100,
      borderRadius: 100
    },
});
