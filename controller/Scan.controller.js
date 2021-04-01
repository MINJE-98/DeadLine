import { Alert } from 'react-native';

import * as api from '../service/Deadline.api';


/**
 * 1. 바코드를 스캔한다.
 * 2. 해당 팀이 이전에 바코드에 대한 상품을 등록했었는지 확인합니다.
 *  => 상품정보가 없을 시, 다른팀이 동록한 바코드에 대한 정보를 보여줍니다.
 *  => 다른 팀의 상품 정보를 선택 하였으면 FORK를 하거나, 그 팀의 바코드 정보를 그대로 사용할 수 있습니다.
 *  ! 단, 다른 팀의 바코드 정보를 그대로 사용할 시 바코드에 대한 정보는 수정이 불가능 하며,
 *  ! 초기 바코드 정보를 등록한 팀만이 수정할 수 있습니다.
 * 
 * 
 * 3. 바코드에 대한 상품 정보를 입력합니다.
 * 4. 입력 받은 바코드에 대한 정보가 저장되고 해당 정보는 팀에 귀속됩니다.
 * 
 */
export const scanbarcode = async(token, barcode, teamuid, props) =>{
    try {
        const result = await api.get_item(token, barcode, teamuid);
        props.navigation.navigate('deadline', {barcode: barcode, result: result.data.data[0]})
    } catch (error) {
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            if (error.response.status === 404) {
                Alert.alert("404 에러!", "", [{text: "확인"}]);
              } 
            else {
              Alert.alert("알수없는 에러!", "", [{text: "확인"}]);
            }
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            Alert.alert("","통신을 실패하였습니다.")
        }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
          }
        }
}

