import * as React from 'react';
import { Text, View, Image, StyleSheet, StatusBar, TextInput } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { render } from 'react-dom';

function Listadd({ route }) {
  
  const { prodTit } = route.params;
  const { imgUrl } = route.params;
  const { barcode } = route.params;
  const [value, onChangeText] = React.useState(prodTit);
   return (
    
      <View style={{ width: "100%", height:"100%", flexDirection: "row"}}>
        <View style={styles.imgview}>
          <Image 
              style={styles.img}
              source={{
                uri: imgUrl,
              }} />
        </View>
       
        <View style={styles.titleview}>
          <Text >{barcode}</Text>
          <TextInput onChangeText={text => onChangeText(text)} value={value} />
        </View>
            
      </View>
    
  );
}

export default Listadd;

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
