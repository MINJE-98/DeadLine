import * as api from "../../api/Api";

// 엑션 타입입니다.
const SET_DEADLINE = "SET_DEADLINE";

const set_deadline = (token, teamuid, goodsid, date) => {
  return async (dispatch) => {
    try {
      const result = await api.set_deladine(token, teamuid, goodsid, date);
      dispatch({ type: SET_DEADLINE, deadline: result.data.data });
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        if (error.response.status === 404) {
          console.log(error.response);
        } else {
          console.log(error.response);
        }
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        Alert.alert("통신을 실패", "통신 실패하였습니다.");
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
    }
  };
};

export { SET_DEADLINE, set_deadline };
