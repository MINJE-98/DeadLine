import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, Image, StyleSheet, StatusBar, TextInput } from 'react-native';
import {Header, Icon} from 'react-native-elements';


export default function GoodsAddScreen(props) {
  
  const { barcode } = props.route.params;
  // const [value, onChangeText] = React.useState();
   return (
      
      <View>
         <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        centerComponent={{ text: '상품 추가', style: {  color: '#000' } }}
        leftComponent={<Icon name='group-back' color='#000' onPress={()=> props.navigation.goBack()}/>}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
        }}
      />
        {/* <View style={styles.imgview}>
          <Image 
              style={styles.img}
              source={{
                uri: imgUrl,
              }} />
        </View> */}
       
        <View style={styles.titleview}>
          <Text >{barcode}</Text>
        </View>
            
      </View>
    
  );
}

const styles = StyleSheet.create({
  img:{
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imgview:{
    margin: 20,
    width: "50%",
    height: "30%",
    backgroundColor: 'black',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  titleview:{
    marginTop: 20,
    height: "30%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }



});
