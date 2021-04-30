import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../components/Loading";
import { team_search_item } from "../../../redux/actions/ItemsAction";

/**
 * 스캔 스크린입니다.
 *
 */
export default function ScanScreen({ navigation }) {
  // 현재 스캔상태
  const [scanned, setScanned] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  // 리둑스에서 토큰을 받아옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 리둑스에서 선택된 팀의 정보를 받아옵니다.
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);
  const dispatch = useDispatch();

  // 팀내에 아이템 찾기
  const teamSearchItem = (token, barcode, teamuid) =>
    dispatch(team_search_item(token, barcode, teamuid));

  useEffect(() => {
    // 카메라 권한 확인
    async () => {
      console.log("A");
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status !== "granted") {
        alert("카메라 권한이 없습니다.");
      }
    };
  }, []);
  // 스캔!
  const Scanned = (barcode) => {
    setModalVisible(true);
    teamSearchItem(token, barcode, selected_team.tuid)
      .then(() => navigation.navigate("DeadlineScreen", { barcode: barcode }))
      .then(() => setModalVisible(false))
      .catch(()=> alert("에러"))
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "80%" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : Scanned()}
          style={{ width: "100%", height: "100%" }}
        />
        <View
          style={{
            width: "100%",
            height: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => Scanned(12332)}
          >
            <FontAwesome name="circle" size={90} />
          </TouchableOpacity>
          <Loading animationType={"none"} visible={modalVisible} />
        </View>
        {/* 
      </View>
      <View>
        {this.state.barcodetype == 0 ? (
          <Text>상품의 바코드를 입력하여 등록하세요!</Text>
        ) : this.state.barcodetype == 1 ? (
          <Text>상품 바코드를 스캔하여 상품을 등록하세요!</Text>
        ) : (
          <Text>사진을 찍고 상품을 등록하세요!</Text>
        )}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {this.state.cameramode ? (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ padding: 30 }}
              onPress={() => this.setState({ cameramode: false })}
            >
              <MaterialIcons name="arrow-back" size={50} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }}>
              <FontAwesome name="circle" size={90} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity>
              <FontAwesome name="pencil-square-o" size={20} />
              <Text
                style={{ borderColor: "black", borderWidth: 1 }}
                onPress={() => {
                  navigation.navigate("inputcode");
                }}
              >
                바코드입력
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="barcode" size={20} />
              <Text
                style={{ borderColor: "black", borderWidth: 1 }}
                onPress={() => {
                  this.context.scancode();
                  scanbarcode(
                    this.state.token,
                    12332,
                    this.context.teaminfo.tuid,
                    this.props
                  );
                }}
              >
                바코드 스캔
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="camera-retro" size={20} />
              <Text
                style={{ borderColor: "black", borderWidth: 1 }}
                onPress={() => {
                  this.context.snapcode();
                  this.setState({ barcodetype: 2, cameramode: true });
                }}
              >
                바코드 없는 상품
              </Text>
            </TouchableOpacity>
          </>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});
