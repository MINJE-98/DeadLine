import React from 'react';
import { render } from 'react-dom';
import { FlatList, Text, TouchableOpacity} from 'react-native';
export default function List({ data, refreshBol, emptyText, refresh, renderItem }){
    return(
        <SafeAreaView >
        <FlatList
        style={{backgroundColor: "black", width: "95%", height: "100%"}}
        data={data}  
        refreshing={refreshBol} 
        ListEmptyComponent={emptyText} 
        onRefresh={refresh} 
        renderItem={renderItem}
        </SafeAreaView>
        )
}
