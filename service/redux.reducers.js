import { AuthAsync } from '../service/facebookfnc'
import * as api from '../service/Deadline.api';


export const islogin = async(state, action) =>{
    if(state == undefined) {
        // 앱을 처음 실행 했을 때.
        const a = await AuthAsync()
        console.log(a);
        return a
    }
    console.log(state);
    switch (action.type){
        // 로그인 버튼 클릭 이벤트
        case 'login':
            // const get = await api.get_user(state);
            // console.log(get);
            // if(get.data.data == undefined) {
            //   await api.set_user(state)
            // }
            return state;
        default:
            return  null;
    }
}