import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import {Context} from '../component/context';
import { SwipeListView } from 'react-native-swipe-list-view';
import ScanScreen from './ScanScreen';
import {ListLoading} from '../component/Loading';

export default function TeamScreen({ navigation, route }){
  const {TeamName, TeamUid} = useContext(Context);
  const [Loading, setLoading] = useState(true);
  const [refreshing, setrefreshing] = useState(true);
  const [Items, setItems] = useState(null);
  const [barcode, setbarcode] = useState({});

  const RootRef = firebase.database().ref()
    useEffect(()=>{
      if(route.params){
        if(route.params.refreshing){
          getitems()
        }
      }
      if(!Items) getitems()
    }, [route.params])

  async function getitems() {
    setLoading(true)
    await RootRef
    .child('Teams')
    .child(TeamUid)
    .child('Items')
    .once('value', Data =>{
      let items = new Object;
      //null 검사.
      if(Data.val()){
        const itemsTemp = Object.keys(Data.val())
        itemsTemp.forEach( a =>{
          RootRef.child('Items').child(a).once('value', b=>{
            items = {
              ...items, [b.key]:b.val()
            }
            
            setbarcode(items);
          })
        })
      }
    })
    .then(()=> {
      RootRef
      .child('Teams')
      .child(TeamUid)
      .child('DeadLine')
      .once('value', Data =>{
        let list = new Array;
        if(Data.val()){
          Data.forEach( a =>{
            list.push({title: a.key, data: Object.keys(a.val())})
          })
          setItems(list);
          setrefreshing(false)
        }
      })
      .then(()=> {setLoading(false);})
      .catch(error => {alert(error); setLoading(false)})
    })
    .catch(error => {alert(error); setLoading(false)})
  }
    //1577-0038
    const renderItem = ({item}) =>{
      return(
        <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity style={{flexDirection: "row", borderBottomWidth: 1, borderColor: "#808080", padding: 10}}>
          <Image style={{backgroundColor: "black", width: 70, height: 70, marginRight: 10}} source={{uri: barcode[item].img}}/>
          <View style={{flexDirection: "column"}}>
            <Text>{barcode[item].name}</Text>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      </View>)
    }
    const renderSectionHeader = ({section}) => {
      const now = new Date(2021,0,17);
      console.log(section.title);
      // const nowString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`


      const result = Math.ceil(((now.getTime()-section.title)/(1000*3600*24)*-1))
      return (
        <Text>{result}일 남음</Text>
      )
    }
  return (
    <View>
    <Header 
      leftComponent={<Icon name='navigate-before' color='#000' onPress={()=> navigation.navigate('Home')}/> } 
      centerComponent={<View style={{alignItems: "center"}}><Text>{TeamName}</Text><Text style={{fontSize: 10, color: "#808080"}}>{TeamUid}</Text></View>}
      rightComponent={<Icon name='add' color='#000' onPress={()=> navigation.navigate('ScanStack',{screen: 'Scan', params: {TeamUid: TeamUid, refreshing: false}})} />}
      containerStyle={{
        backgroundColor: '#fff',
        justifyContent: 'space-around',
      }}
      />
      {Loading ? <ListLoading /> :
      <SafeAreaView>
        <SwipeListView
        useSectionList
        sections={Items}
        onRefresh={getitems}
        refreshing={refreshing}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        />
      </SafeAreaView>
      }
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
