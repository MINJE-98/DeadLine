import React, { Component, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';


import ActionModal from '../../../components/Modal';
import { modalstyles } from '../../../styles/light/styles'

export default function Itemlist({ navigation }){
  const { itemlist } = useSelector(state => state.ItemsReducer)

  useEffect(()=>{
    console.log("ItemList");
    console.log(itemlist);
  })
        return(
          <ActionModal 
          width={340}
          height={500}
          mainMessage='다른 팀에서 등록한 상품 정보입니다.'
          exmessage={()=>(
            <Text style={modalstyles.exMessage}>다른 팀에서 등록한 상품을 사용해보세요!</Text>
          )}
          body={()=> (
            <FlatList　
            style={{width: '100%', height: 330 }}
            data={itemlist}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text>등록된 상품이 없습니다.</Text>
              </View>
            } 
            keyExtractor={(item)=> item.goodsid.toString()}
            renderItem={({item}) => {
              return(
                <View style={[styles.center]}>
                  <Text>{item.goodsid}</Text>
                  <Text>{item.tuid}</Text>
                </View>
              )
            }
            } />
          )}
          foot={()=> (
            <>
              <TouchableOpacity style={modalstyles.listviewButton} onPress={()=> navigation.goBack()}>
                <Text style={modalstyles.confirmText}>직접 추가</Text>
              </TouchableOpacity>
            </>
          )}
          flexDirection='column'
          />
        )
    }

const styles = StyleSheet.create({
      center:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
})
