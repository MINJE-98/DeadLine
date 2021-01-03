import React, { useState, useEffect, useRef, useContext } from 'react';
import { TextInput, Text, View, StyleSheet, Image, Button, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { BarCodeScanner } from 'expo-barcode-scanner';
import ActionSheet from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Camera } from 'expo-camera';
import firebase from "firebase";

import Style from '../Style';

import {Context} from '../context';


export default function ScanScreen(props) {
  // const { TeamUid } = props.route.params;
  const now = new Date()
  const [GoodsProfileModal, setGoodsProfileModal] = useState(true);
  const [CameraModal, setCameraModal] = useState(false);
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [date, setDate] = useState(now);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [productTit, setproductTit] = useState(null);
  const [barcode, setbarcode] = useState('88000000000');
  const [ImageUrl, setImageUrl] = useState(null);
  const [yymmdd, setyymmdd] = useState(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`);
  const {TeamUid} = useContext(Context)
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
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate)
    setyymmdd(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`)
    
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const handleBarCodeScanned = async({data}) => {
    
    // const ref =  firebase.storage().ref().child(`GoodsImages/${data}.jpg`);
    // ref.put().on('storage/object-not-found', ()=>{
    //   console.log("A");
    // })
    // const url = await ref.getDownloadURL();
    // setImageUrl(url) 
    setbarcode(data)
    setScanned(true);
    setGoodsProfileModal(true);

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

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });
    if (!result.cancelled) setImageUrl(result.uri);
  };
  const showActionSheet = () => {
    actionSheet.current.show();
  };
  const snap = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });
    if (!result.cancelled) setImageUrl(result.uri);
}
  const upload = async() => {
    const response = await fetch(ImageUrl);
    const blob = await response.blob();
    const ref =  firebase.storage().ref().child('GoodsImage/' + barcode + '/' + productTit + '.jpg');
    ref.put(blob, {contentType: 'iamge/jpg'}).then( snapshot =>{
      snapshot.ref.getDownloadURL().then( snapshot =>{
        setImageUrl(snapshot)
      })

    });
    
    firebase.database().ref('Teams/'+ TeamUid +'/TeamItems/' + yymmdd + '/' + barcode).set({
      name: productTit,
      img: ImageUrl,
    })
    cancel();
  }
  const cancel = () =>{
    setGoodsProfileModal(!GoodsProfileModal); 
    setScanned(false); 
    setImageUrl(null)
    setproductTit(null);
    setImageUrl(null);
    setbarcode(null);
  } 
  return (
    <View style={styles.container}>
      {scanned 
      ? <></>
      :
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.container}
      >
        </BarCodeScanner>
      }

      
      <Modal animationType="slide" transparent={false} visible={GoodsProfileModal} onRequestClose={()=> cancel()}>
        <View style={Style.Goods_Profile_Modal}>
          <View style={Style.Goods_Top}>
            <TouchableOpacity style={Style.Goods_Profile_Image_Button} onPress={showActionSheet}>
                {ImageUrl == null 
                ? <Image style={Style.Goods_Profile_Image} source={require('../no-image.png')}/> 
                : <Image style={Style.Goods_Profile_Image} source={{uri: ImageUrl}}/>}
              </TouchableOpacity>
              <View style={Style.Goods_Text_Input_View}>
                <TextInput style={Style.Goods_TexInput} placeholder="제품명을 입력해주세요." onChangeText={Text => setproductTit(Text)}>{productTit}</TextInput>
                <Text style={Style.Goods_Profile_Text}>{barcode}</Text>
 
                {/** 태그 기능 */}
                {/* <TouchableOpacity style={{backgroundColor: "#f4f4f4", width: 200, height: 70, padding: 5, marginTop: 5}} onPress={()=>alert("B")}>
                  <TouchableOpacity style={{width: 60, height: 20, alignItems: "baseline"}} onPress={()=>alert("A")}>
                    <Text style={{backgroundColor: "#a5cbf0", color:"white", fontSize: 10, borderRadius: 10, padding: 5}}>미완성기능</Text>
                  </TouchableOpacity>
                </TouchableOpacity> */}
              </View>
          </View>
          <View style={Style.Goods_Middle}>
            <View style={Style.Goods_Table}>
              <Icon color="black" size={20} style={{paddingRight: 20}} name='calendar' />
              <TouchableOpacity onPress={showDatepicker} title="Show date picker!">
                <Text style={{fontSize: 20}}>{yymmdd}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            <View style={Style.Goods_Bottom}>
            <TouchableOpacity style={Style.Goods_Cancel} onPress={()=> {cancel()}}>
                <Text style={{color: '#808080', fontWeight: 'bold'}}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.Goods_Add} onPress={()=>upload()} >
                <Text style={{color: '#fff', fontWeight: 'bold'}}>상품 추가</Text>
              </TouchableOpacity>

            </View>
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
                  snap()
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