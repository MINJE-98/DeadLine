import { items } from "../actions/index";
const {
  TEAM_SEARCH_ITEM,
  TOTAL_SEARCH_ITEM,
  GET_TEAM_ITEMLIST,
  GET_TOTAL_ITEMLIST,
} = items;

//초기 state 설정
const defaultSate = {
  iteminfo: null,
  itemlist: null,
};
export default ItemsReducer = (state = defaultSate, action) => {
  switch (action.type) {
    case TEAM_SEARCH_ITEM:
      console.log("TEAM_SEARCH_ITEM");
      return { ...state, iteminfo: action.iteminfo };
    case TOTAL_SEARCH_ITEM:
      console.log("TOTAL_SEARCH_ITEM");
      return { ...state, itemlist: action.itemlist };
    case GET_TEAM_ITEMLIST:
      console.log("GET_TEAM_ITEMLIST");
      return {...state, iteminfo: state.iteminfo }
    case GET_TOTAL_ITEMLIST:
      console.log("GET_TOTAL_ITEMLIST");
      return state
    default:
      console.log("ItemsReducer");
      return state;
  }
};
