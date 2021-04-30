import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useSelector, useDispatch } from "react-redux";
import { TextInputMask } from "react-native-masked-text";

import { total_search_item } from "../../../redux/actions/ItemsAction";
import ImageSelector from "../../../components/Showactionsheet";
import Deadline from "../../../components/Deadline";
import { deadlinestyles } from "../../../styles/light/styles";
import { Alert } from "react-native";
import { set_deadline } from "../../../redux/actions/DeadlineAction";
/**
 * 스캔 스크린입니다.
 *
 */

export default function ScanScreen({ route, navigation }) {
  const now = new Date();
  const dispatch = useDispatch();
  // 훅
  const [prodname, setName] = useState(null);
  const [prodbarcode, setBrocde] = useState(null);
  const [prodimageURL, setImageURL] = useState(null);
  const [date, setdate] = useState(
    `${now.getFullYear()}-${("0" + (1 + now.getMonth())).slice(-2)}-${(
      "0" + now.getDate()
    ).slice(-2)}`
  );

  // 토큰을 불러옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 선택된 팀을 불러옵니다.
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);

  // 팀이 등록한 아이템정보를 불러옵니다.
  const { iteminfo } = useSelector((state) => state.ItemsReducer);

  // 전체 아이템 찾기
  const totalSearchItem = (token, barcode) =>
    dispatch(total_search_item(token, barcode));
  // 유통기한 등록
  const setDeadline = (token, teamuid, goodsid, date)=>
    dispatch(set_deadline(token, teamuid, goodsid, date))

  useEffect(() => {
    // 바코드
    setBrocde(route.params.barcode);
    console.log(iteminfo);

    // 팀이 아이템을 가지고 있지 않을 경우.
    // 전체 팀이 등록한 아이템리스트를 가져옵니다.
    if (!iteminfo) {
      totalSearchItem(token, route.params.barcode).then(() =>
        navigation.navigate("Itemlist")
      );
      // .then(() => setModalVisible(false));
    } else {
      // 팀이 아이템을 가지고 있을 때.
      setImageURL(iteminfo.imageURL);
      setName(iteminfo.name);
    }
  }, []);

  return (
    <ActionSheetProvider>
      <Deadline
        ImageSelector={() => <ImageSelector result={prodimageURL} />}
        Barcode={prodbarcode}
        // 날짜 입력 컴포넌트
        InputDateMask={() => (
          <TextInputMask
            style={[deadlinestyles.defaultFont, { fontSize: 18 }]}
            type={"datetime"}
            options={{
              format: "YYYY-MM-DD",
            }}
            placeholder={`${now.getFullYear()}-${("0" + (1 + now.getMonth())).slice(-2)}-${("0" + now.getDate()).slice(-2)}`}
            value={date}
            onChangeText={(text) => {
              setdate(text);
            }}
          />
        )}
        // 상품명 컴포넌트
        InputProdName={()=> 
          <TextInput
              style={[
                deadlinestyles.defaultFont,
                { width: 300, overflow: "scroll" },
              ]}
              placeholder="제품명을 입력해주세요."
              onChangeText={(Text) => setName(Text)}
            >
              {prodname}
            </TextInput>
        }
        AddProd={()=> 
          <TouchableOpacity style={deadlinestyles.confirmButton} onPress={ () => {
            Alert.alert("", "유통기한을 등록하시겠습니까?", [
              { text: "취소", style: "cancel" },
              { text: "확인", onPress: 
                async()=> {
                  setDeadline(token, selected_team.tuid, iteminfo.goodsid, date)
            //     try {
            //       const result = await api.set_deladine(token, selected_team.tuid, iteminfo.goodsid, date)
            //       if(result.data.error_code == "0013") Alert.alert("", "유통기한을 등록하였습니다.",[
            //         {text: "확인", onPress:()=> navigation.navigate("ScanScreen")}])
            //     } catch (error) {
            //       if (error.response) {
            //         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            //         if (error.response.status === 404) {
            //         } else {
            //           console.log(error.response);
            //           Alert.alert("40*에러", error.response.message);
            //         }
            //       } else if (error.request) {
            //         // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            //         Alert.alert("통신을 실패", "통신 실패하였습니다.");
            //       } else {
            //         // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            //         console.log("Error", error.message);
            //       }
            //     }
            //   }
            }}])
          }}>
            <Text style={[deadlinestyles.defaultFont, deadlinestyles.confirmText]}>
              상품 추가
            </Text>
          </TouchableOpacity>
        }
      />
    </ActionSheetProvider>
  );
}