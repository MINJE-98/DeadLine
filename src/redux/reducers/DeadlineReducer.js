import { dead } from '../actions/index'
const { SET_DEADLINE } = dead

//초기 state 설정
const defaultSate ={
    deadline: null
}
export default DeadlineReducer = (state = defaultSate, action) =>{

    switch (action.type){
        case SET_DEADLINE:
            console.log("SET_DEADLINE");
            return {...state, deadline: action.deadline}
        default:
            console.log("DeadlineReducer");
            return state
    }
}
