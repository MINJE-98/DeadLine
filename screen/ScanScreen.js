import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button, StatusBar, Modal, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import  Icon  from 'react-native-vector-icons/Ionicons';
// import ListaddScreen from './screen/ListaddScreen';
const cheerio = require('react-native-cheerio');
function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
async function crawling(data){
  const url =`http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=${data}`
  try{
    const response = await fetch(url); // fetch page
    const htmlString =  await response.text(); // get response text
    const $ = cheerio.load(htmlString);
    const productTit = $('.productTit').text();
    const imageUrl = $('img#detailImage').attr('src');
   
    navigation.navigate('상품 추가', {prodTit: productTit.replace(/\s/g,'').replace(data,''), imgUrl: imageUrl, barcode: data});
    }
   catch(error){
    alert(error)
  }
}
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    crawling(data);

    // setModalVisible(true);
  };

  if (hasPermission === null) {
    return <Text>카메라 권한이 없습니다.</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라에 접근할 수 없습니다.</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.Scanner}
      />
      <View style={styles.shape}>
        <Icon name="ios-qr-scanner" style={{ position: 'absolute',fontSize:30, color: '#ffd700',}}/>
        <Icon name="ios-barcode" style={{ position: 'absolute', fontSize:20, color: '#ffd700',}}/>
        <View style={styles.centeredView}>
          {/* <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed.");}}> 
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={() => { setModalVisible(!modalVisible);}}>
              <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
          </Modal> */}
        </View>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
  }

export default ScanScreen;

const styles = StyleSheet.create({
  Scanner:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  shape:{
    flex: 1,
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