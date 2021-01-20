import { useLinkProps } from '@react-navigation/native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import firebase from "firebase";
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionSheet from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { LoadingScreen } from '../component/Loading';

export default function GoodsAddScreen({ navigation, route }) {
  const now = new Date()
  const [productTit, setproductTit] = useState(null);
  // const [barcode, setbarcode] = useState('8808');
  const [ImageUrl, setImageUrl] = useState(null);
  const [yymmdd, setyymmdd] = useState(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`);

  const [Loading, setLoading] = useState(false);
  const [imageLoading, setimageLoading] = useState(false);

  const [date, setDate] = useState(now);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const { TeamUid } = route.params
  const { barcode } = route.params;

  let actionSheet = useRef();

  useEffect(()=>{
    ImageUrl || productTit || Loaditem(route.params.barcode)
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('파일 접근 권한이 없습니다.');
        }
      }
    }
  })
  /**
   * 카메라 ? 선택 : 찍기 기능
   */
  function showActionSheet(){
    actionSheet.current.show();
  };
  async function ImagePick(){
    setimageLoading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });
    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      firebase.storage().ref().child(`GoodsImage/${barcode}.jpg`).put(blob, {contentType: 'iamge/jpg'}).then( snapshot =>{
        snapshot.ref.getDownloadURL().then( snapshot =>{
          setImageUrl(snapshot);
        }).then(()=>{
          setimageLoading(false);
        })
        .catch(error => {alert(error); setimageLoading(false)} )
      }).catch(error => {alert(error); setimageLoading(false)} )
    }
  };
  async function LanchCamera(){
    setimageLoading(true)
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });
    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      firebase.storage().ref().child(`GoodsImage/${barcode}.jpg`).put(blob, {contentType: 'iamge/jpg'}).then( snapshot =>{
        snapshot.ref.getDownloadURL().then( snapshot =>{
          setImageUrl(snapshot);
        }).then(()=>{
          setimageLoading(false);
        })
        .catch(error => {alert(error); setimageLoading(false)} )
      }).catch(error => {alert(error); setimageLoading(false)} )
    }
  }
  /**
   * 상품 업로드 || 취소
   */
  function upload(){
    //로딩 시작
    setLoading(true)
    //Items에 저장.
    firebase.database().ref().child('Items').child(barcode).set({
      name: productTit,
      img: ImageUrl
    })
    firebase.database().ref().child('Teams').child(TeamUid).child('DeadLine').child(yymmdd).child(barcode).set({
      id: 0
    })
    firebase.database().ref().child('Teams').child(TeamUid).child('Items').child(barcode).set({
      tag: 'a'
    })
    .then(()=>{navigation.navigate('Scan', {Scan: false, refreshing: true})})
  }
  function cancel(){
    navigation.navigate('Scan', {Scan: false, refreshing: false})
  }
  /**
   * 아이템 추가
   */
  async function Loaditem(data){
    await firebase.database().ref(`Items/${data}`).once('value', snapshot =>{
      if(snapshot.val() != null){
        setImageUrl(snapshot.val().img)
        setproductTit(snapshot.val().name)
      }
    })
    .then(()=>{
      setLoading(false)
    })
    .catch(error => {alert(error); setLoading(false);})
  }
  /**
   * 달력 관련 기능
   */
  function onChange(event, selectedDate){
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
    

  };
  function showMode(currentMode){
    setShow(true);
    setMode(currentMode);
  };
  function showDatepicker(){
    showMode('date');
  };
  
  return(
    <View style={styles.Goods_Profile_Modal}>
      
      <View style={styles.Goods_Top}>
        <TouchableOpacity style={styles.Goods_Profile_Image_Button} onPress={showActionSheet}>
            {imageLoading ? <LoadingScreen />:
            ImageUrl == null 
            ? <Image style={styles.Goods_Profile_Image} source={require('../no-image.png')}/> 
            : <Image style={styles.Goods_Profile_Image} source={{uri: ImageUrl}}/>}
          </TouchableOpacity>
          <View style={styles.Goods_Text_Input_View}>
            <TextInput style={styles.Goods_TexInput} placeholder="제품명을 입력해주세요." onChangeText={Text => setproductTit(Text)}>{productTit}</TextInput>
            <Text style={styles.Goods_Profile_Text}>{barcode}</Text>
          </View>
      </View>

      <View style={styles.Goods_Middle}>
        <View style={styles.Goods_Table}>
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
        <View style={styles.Goods_Bottom}>
        <TouchableOpacity style={styles.Goods_Cancel} onPress={()=> {cancel()}}>
            <Text style={{color: '#808080', fontWeight: 'bold'}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Goods_Add} onPress={()=>upload()} >
            <Text style={{color: '#fff', fontWeight: 'bold'}}>상품 추가</Text>
          </TouchableOpacity>

        </View>
        <ActionSheet
        ref={actionSheet}
        options={['앨범에서 사진 선택', '사진 촬영', '취소']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => {
            switch (index) {
              case 0:
                ImagePick()
                break;
              case 1:
                LanchCamera()
                break;
              default:
                break;
            }
        }}
      />
      <Modal animationType="none" transparent={true} visible={Loading}>
        <LoadingScreen />
      </Modal>
  </View>

    )
}

const styles = StyleSheet.create({
  Goods_Profile_Modal:{
    width: "100%",
    height: "100%",
    backgroundColor: '#f2f2f2'
    
},
    Goods_Top:{
        marginTop: 30,
        width: '100%',
        height: 160,
        flexDirection: 'row',
        backgroundColor: "white",
        shadowColor: "#000",

    },  
        Goods_Profile_Image_Button :{
            width: 120,
            margin: Platform.OS === 'ios' ? 30 : 20,
            borderColor: "#f2f2f2",
            borderWidth: 1
            
        },
            Goods_Profile_Image:{
                backgroundColor: "black",
                height: 120,
                width: "100%",
                
            },
            
        Goods_Text_Input_View:{
            flexDirection: "column", 
            paddingLeft: 2,
            marginTop: Platform.OS === 'ios' ? 30 : 20,
        },
            Goods_Profile_Text:{
                fontSize: Platform.OS === 'ios' ? 15 : 13,
                color: "#808080",
                marginTop: 10,
            },
            Goods_TexInput:{
                backgroundColor: '#fff',
                color: 'black',
                fontSize: Platform.OS === 'ios' ? 18 : 12,
                width: Platform.OS === 'ios' ? '150%' : '130%',
                padding: 3,
                borderColor: "#f2f2f2",
                borderWidth: 1
                
            },


    Goods_Middle:{
        width: "100%",
        height: "40%",
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: "column",
        padding: 20,
    },
        Goods_Table:{
            width: "100%",
            height: "20%",
            alignItems: 'center',
            flexDirection: "row",
            borderColor: '#f2f2f2',
            borderBottomWidth: 2
            
            
        },
    Goods_Bottom:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
        Goods_Cancel:{
            alignItems: 'center',
            backgroundColor: '#e9ecef',
            padding: 20,
            width: '30%',
            margin: 10,
        },
        Goods_Add:{
            alignItems: 'center',
            backgroundColor: '#e17125',
            padding: 20,
            width: '30%',
            margin: 10,
            
        },
});
