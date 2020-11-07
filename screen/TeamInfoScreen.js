import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Header, Icon, SearchBar } from 'react-native-elements'
import firebase from 'firebase';
import { render } from 'react-dom';
import { logout } from '@react-native-seoul/kakao-login';

const cheerio = require('react-native-cheerio');

export default function TeamScreen(props){
  const [scanmodalVisible, setscanmodalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { TeamUid } = props.route.params;

  useEffect(() => {
    if(scanmodalVisible){
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }
  }, []);
  
  async function crawling(data){
    const url =`http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=${data}`
    try{
      const response = await fetch(url); // fetch page
      const htmlString =  await response.text(); // get response text
      const $ = cheerio.load(htmlString);
      let productTit = $('.productTit').text();
      if(!productTit) productTit = $('.noresult').text();
      const imageUrl = $('img#detailImage').attr('src');
      setscanmodalVisible(!scanmodalVisible);
      
      
    }
    catch(error){
      alert(error)
    }
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
      {/* <View style={styles.shape}> */}
      {/* <Icon name='clear' color='#fff' onPress={()=> setModalVisible(!modalVisible)}/> */}
      {/* </View> */}
    </Modal>
    <Header 
      leftComponent={<Icon name='navigate-before' color='#fff' onPress={()=> props.navigation.goBack()}/> } 
      centerComponent={{text: TeamUid, style: { color: '#fff' } }}
      rightComponent={<Icon name='add' color='#fff' onPress={()=> setscanmodalVisible(true)}/>}
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

});
