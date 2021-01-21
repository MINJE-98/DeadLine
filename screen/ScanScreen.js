import React, { useState, useEffect, useContext } from 'react';
import { TextInput, Text, View, StyleSheet, Image, Button, Modal, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { LoadingScreen } from '../component/Loading';
import { Header, Icon } from 'react-native-elements'

export default function ScanScreen({ navigation, route }) {
  // const { TeamUid } = props.route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    console.log(route.params);
    if(route.params){
      setScanned(route.params.Scan)
    }
      //카메라 권한 확인
    async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  }, [route.params]);

  const handleBarCodeScanned = ({data}) => {
    navigation.navigate('AddList', {TeamUid: route.params.TeamUid,  barcode: data})
    setScanned(true);
  };
  // const checkpermission = () =>{
  //   if (hasPermission === null) {
  //     return <Text>카메라 권한이 없습니다.</Text>;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>카메라에 접근할 수 없습니다.</Text>;
  //   }
  // }

  return (
    <View style={{flex: 1}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          
          style={styles.container}
        >
      <View style={{ width: "100%", height: "65%"}} />
      <View style={{ flex: 1, flexDirection: "row", backgroundColor:"white", width: "100%", height: "35%"}} >
        <Text>바코드입력</Text>
        <Text>바코드 스캔</Text>
        <Text>바코드 없는 상품</Text>
      </View>
          </BarCodeScanner>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center"
  },
  Scanner:{
    width: "100%",
    height: "103%",
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
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
      width: "50%",
      height: "50%",
      borderRadius: 20
    },
});