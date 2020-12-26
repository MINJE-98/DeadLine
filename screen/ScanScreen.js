import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Text, View, StyleSheet, Image, StatusBar, Modal, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ActionSheet from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase";




export default function ScanScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setselect] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Goods, setGoods] = useState({});
  let actionSheet = useRef();

  useEffect(() => {
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
      //카메라 권한 확인
      async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  }, []);
  const handleBarCodeScanned = ({data}) => {
    console.log("scaning!");
    
    props.navigation.navigate('GoodsAdd', {barcode: data});
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
  const pickImage = async () => {
    const storageRef = firebase.storage().ref();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0,
    });
    if (!result.cancelled) {
    //  storageRef.child('GoodsImage/' + result.uri).put(result.uri, {contentType: 'iamge/jpg'}).then( ()=> console.log("업로드 완료."))
    Goods.imageUrl = result.uri;
    setGoods(Goods);
      
    }
  };
  const showActionSheet = () => {
    actionSheet.current.show();
  };
  return (
    <View style={styles.container}>
      {console.log(scanned)}
      
      {scanned ? <></>
      // <Header 
      //   // leftComponent={<Icon name='clear' color='#000' onPress={()=> {setModalVisible(!modalVisible); setScanned(false)}}/> } 
      //   centerComponent={{text: "상품 추가", style: { color: '#000' }}}
      //   containerStyle={{
      //     backgroundColor: '3D6DCC',
      //     justifyContent: 'space-around',
      //   }}/>
        :
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.container}
        
      >
        </BarCodeScanner>
      }

      
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          {/* <Text>{Goods.barcode}</Text>
          <TextInput onChangeText={Text => { Goods.productTit = Text; setGoods(Goods)}}></TextInput>
          <TextInput onChangeText={Text => { Goods.count = Text; setGoods(Goods)}}></TextInput>
          <TextInput onChangeText={Text => { Goods.date = Text; setGoods(Goods)}}></TextInput> */}
        <TouchableOpacity onPress={showActionSheet}>
          {Goods.imageUrl == null 
          ? <Image style={styles.profile} source={require('../no-image.png')}/> 
          : <Image style={styles.profile} source={{uri: Goods.imageUrl}}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> console.log(Goods)}>
          <Text>상품 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {setModalVisible(!modalVisible); setScanned(false)}}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
      </Modal>
      <ActionSheet
          ref={actionSheet}
          options={['앨범에서 사진 선택', '사진 촬영', '취소']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
              switch (index) {
                case 0:
                  pickImage()
                  break;
                case 1:
                  break;
                default:
                  break;
              }
          }}
        />

    </View>
  );
  }


const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
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
  modal:{
    backgroundColor: "gray",
    width: "100%",
    height: "100%",
    justifyContent: "center",
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
      borderRadius: 150
    },
});