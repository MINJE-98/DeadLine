import * as api from "../../api/Api";

// 엑션 타입입니다.
const TEAM_SEARCH_ITEM = "TEAM_SEARCH_ITEM";
const GET_TEAM_ITEMLIST = "GET_TEAM_ITEMLIST";
const TOTAL_SEARCH_ITEM = "TOTAL_SEARCH_ITEM";
const GET_TOTAL_ITEMLIST = "GET_TOTAL_ITEMLIST";

const team_search_item = (token, barcode, teamuid) => {
  return async (dispatch) => {
    try {
      const result = await api.get_item(token, barcode, teamuid);
      dispatch({ type: TEAM_SEARCH_ITEM, iteminfo: result.data.data[0] });
    } catch (e) {
      console.log(e);
    }
  };
};
const total_search_item = (token, barcode) => {
  return async (dispatch) => {
    try {
      const result = await api.get_itemlist(token, barcode);
      console.log(result.data.data);
      dispatch({ type: TOTAL_SEARCH_ITEM, itemlist: result.data.data });
    } catch (e) {
      console.log(e);
    }
  };
};
const get_team_itemlist = () => ({ type: GET_TEAM_ITEMLIST });

const get_total_itemlist = () => ({ type: GET_TOTAL_ITEMLIST });

export {
  TEAM_SEARCH_ITEM,
  TOTAL_SEARCH_ITEM,
  GET_TEAM_ITEMLIST,
  GET_TOTAL_ITEMLIST,
  team_search_item,
  total_search_item,
  get_team_itemlist,
  get_total_itemlist,
};
