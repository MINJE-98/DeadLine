import React, { Component, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

export default function TeamInfoScreen() {
  // const [teamInfo, setTeamInfo] = useState(null)
  const { selected_team } = useSelector( state => state.TeamInfoRducer)

  return (
    <View>
      {console.log(selected_team)}
      <Text>팀인포~</Text>
      {/* {Loading ? <ListLoading /> :
          <SafeAreaView>
            <SwipeListView
            useSectionList
            sections={Items}
            onRefresh={getitems}
            ListEmptyComponent={<Text>상품이 없습니다.</Text>} 
            refreshing={refreshing}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            // renderHiddenItem={renderHiddenItem}
            // leftOpenValue={75}
            // rightOpenValue={-150}
            // previewRowKey={'0'}
            // previewOpenValue={-40}
            // previewOpenDelay={3000}
            // // keyExtractor={(items)=> console.log(items)}
            />
          </SafeAreaView>
          } */}
    </View>
  );
}
