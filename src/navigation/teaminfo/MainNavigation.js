import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { useSelector } from 'react-redux';


// import TeamInfoScreen from "../../../containers/teaminfo/TeaminfoScreen";
import ScanScreen from "../../containers/teaminfo/deadline/ScanScreen"
import DeadlineScreen from '../../containers/teaminfo/deadline/DeadlineScreen'
import TeamInfoScreen from "../../containers/teaminfo/TeaminfoScreen";
import { HeaderRightIcon, HeaderLeftIcon, HeaderTitle } from "../../components/Header";

const Stack = createStackNavigator();
export default function MainNavigation({ navigation }) {
  const { selected_team } = useSelector( state => state.TeamInfoRducer)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {console.log(selected_team)}
      {/** 팀인포  */}
      <Stack.Screen
        name="TeamInfo"
        component={TeamInfoScreen}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <HeaderRightIcon
                iconType={"MaterialIcons"}
                name={"person-add"}
                onPress={() => navigation.navigate("")}
              />
              <HeaderRightIcon
                iconType={"MaterialCommunityIcons"}
                name={"barcode-scan"}
                onPress={() => navigation.navigate("ScanScreen")}
              />
              </View>
          ),
          headerTitle: () => <HeaderTitle text={selected_team.name}/>,
          headerLeft: () => (
            <View style={{ flexDirection: "row" }}>
            <HeaderLeftIcon
              iconType={"MaterialIcons"}
              name={"arrow-back"}
              onPress={() => navigation.goBack()}
            />
            </View>
          ),
        }}
      />
      <Stack.Screen name="ScanScreen" component={ScanScreen} 
        options={{
          headerLeft: () => (
            <View style={{ flexDirection: "row" }}>
            <HeaderLeftIcon
              iconType={"MaterialIcons"}
              name={"arrow-back"}
              onPress={() => navigation.navigate('TeamInfo')}
            />
            </View>
          ),
          headerTitle: () => <HeaderTitle text={'상품 스캔'}/>,
        }}
      />
      <Stack.Screen name="DeadlineScreen" component={DeadlineScreen} 
        options={{
          // headerShown: false,
          // headerStyle: { backgroundColor: 'tomato' },
          // cardStyleInterpolator:
          // CardStyleInterpolators.forModalPresentationIOS,
          headerLeft: () => (
            <View style={{ flexDirection: "row" }}>
            <HeaderLeftIcon
              iconType={"MaterialIcons"}
              name={"arrow-back"}
              onPress={() => navigation.navigate('ScanScreen')}
            />
            </View>
          ),
          headerTitle: () =>(<HeaderTitle text={'상품 추가'} />),
        }}
      />
    </Stack.Navigator>
  );
}
