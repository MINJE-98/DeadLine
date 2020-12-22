import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Header, Icon } from 'react-native-elements'
import firebase from 'firebase';

const cheerio = require('react-native-cheerio');

export default function TeamScreen(props){
  const [scanmodalVisible, setscanmodalVisible] = useState(false);
  const [listmodalVisible, setlistmodalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [barcode, setbarcode] = useState(null);
  const [Goods, setGoods] = useState({});
  const { TeamUid } = props.route.params;

  const getDB = () => firebase.database();
  useEffect(() => {
    crawling(8801094083007)
    if(scanmodalVisible){
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }
  }, []);
  
function crawling(barcode){
  // firebase에 해당 바코드 있는지 체크
  getDB().ref(`Items/${barcode}`).once('value').then( sanpshot=>{
    if(sanpshot.val() == null) {setbarcode(barcode)}
    else {
      setbarcode(barcode)
      setGoods(sanpshot.val());
    }
  })
  // setscanmodalVisible(!scanmodalVisible);
  setTimeout(() => {
    setModalVisible(!modalVisible);
  }, 100);
}
function showGoods() {
  let keyList =[];
  const list = Object.keys(Goods);
  list.forEach(element => keyList.push({key:element}))
  return keyList
}
  async function uploadImageAsync() {
    const uri = Goods.imageUrl;
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('인터넷 열결 실패'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref(`/GoodsImage/${Goods.barcode}`)
      .child(Goods.productTit);
    const snapshot = await ref.put(blob);
    blob.close();
    console.log(await snapshot.ref.getDownloadURL());
  }
  const handleBarCodeScanned = ({data}) => {
    crawling(data);
  };
  const checkpermission = () =>{
    if (hasPermission === null) {
      return <Text>카메라 권한이 없습니다.</Text>;
    }
    if (hasPermission === false) {
      return <Text>카메라에 접근할 수 없습니다.</Text>;
    }
  }
  return (
  <View>
    <Modal animationType="slide" transparent={true} visible={scanmodalVisible}>
      {checkpermission()}
      <Header 
        leftComponent={<Icon name='clear' color='#fff' onPress={()=> setscanmodalVisible(!scanmodalVisible)}/> } 
        centerComponent={{text: "상품 스캔", style: { color: '#fff' }}}
        containerStyle={{
          position: 'absolute',
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          justifyContent: 'space-around',
          left: 0,
          right: 0,
          zIndex: 2
        }}
      />
      
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.Scanner}
      />
    </Modal>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* {Goods != null ? setlistmodalVisible(true) : setModalVisible(!modalVisible)} */}
      <Header 
        leftComponent={<Icon name='clear' color='#000' onPress={()=> {setModalVisible(!modalVisible); setTimeout(() => {
          setscanmodalVisible(true);
        }, 100); }}/> } 
        centerComponent={{text: "상품 추가", style: { color: '#000' }}}
        containerStyle={{
          backgroundColor: '3D6DCC',
          justifyContent: 'space-around',
        }}/>
        <Text>{Goods.barcode}</Text>
        <TextInput onChangeText={Text => { Goods.productTit = Text; setGoods(Goods)}}>{Goods.productTit}</TextInput>
        <TextInput onChangeText={Text => { Goods.count = Text; setGoods(Goods)}}></TextInput>
        <TextInput onChangeText={Text => { Goods.date = Text; setGoods(Goods)}}></TextInput>
       <TouchableOpacity onPress={()=> true}>
        {Goods.imageUrl == null 
        ? <Image style={styles.profile} source={require('../no-image.png')}/> 
        : <Image style={styles.profile} source={{uri: Goods.imageUrl}}/>}
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> uploadImageAsync()}>
         <Text>상품 추가</Text>
       </TouchableOpacity>
    </Modal>
    <Modal animationType="slide" transparent={true} visible={listmodalVisible}>
    <View>
        <FlatList
        data={showGoods()} 
        renderItem={({item}) => <Text>{item.key}</Text>} />
      </View>
    </Modal>
    <Header 
      leftComponent={<Icon name='navigate-before' color='#fff' onPress={()=> props.navigation.goBack()}/> } 
      centerComponent={{text: TeamUid, style: { color: '#fff' } }}
      rightComponent={<Icon name='add' color='#fff' onPress={()=> setModalVisible(true)}/>}
      containerStyle={{
        backgroundColor: '#3D6DCC',
        justifyContent: 'space-around',
      }}
      />
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
