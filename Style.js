import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import GoodsAddScreen from './screen/GoodsAddScreen';

export default StyleSheet.create({
    /**
     *  ScanScreen.js
     */
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
    /**
     * Loading.js
     */
    Loading_Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    Loading_Wall: {
        position: "absolute", 
        opacity: 0.5, 
        backgroundColor: "black", 
        width: "100%", 
        height: "100%"
      },

    /**
     * Loading.js, HomeScreen.js
     */
    Team_List:{
        backgroundColor: "white",
        width: "90%",
        height: 130,
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
    

});