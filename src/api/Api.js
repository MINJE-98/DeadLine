import axios from 'axios';
import { config } from '../config/ApiURL'

// 유저 정보를 가져옵니다.
// GET /api/auth
// headers: token
// params: null
export const get_user = ( token ) =>{
    return axios.get(`${config.API_URL}/api/auth`,{
        headers:{
            token: token
        }
    });
}
// 유저 정보를 저장합니다.
// POST /api/auth
// headers: token
// params: null
export const set_user = ( token ) =>{
    return axios.post(`${config.API_URL}/api/auth`,{},{
        headers:{
            token: token
        }
    });
}

// 팀을 생성합니다.
// POST /api/teams
// headers: token
// params: teamuid, teamname
export const set_team = (token, teamuid, teamname) =>{
    return axios.post(`${config.API_URL}/api/teams?teamuid=${teamuid}&teamname=${teamname}`,{},{
        headers:{
            token: token
        }}
    );
}

// POST /api/teams/members?teamuid={temauid}&state={state}
// 팀에 가입합니다.
// headers: token
// params: teamuid, state
export const join_team = (token, teamuid, state) =>{
    return axios.post(`${config.API_URL}/api/teams/members?teamuid=${teamuid}&state=${state}`,{},{
        headers:{
            token: token
        }}
    );
}
// GET /api/teams/members/teamlist
// 한 유저가 가입한 팀리스트를 가져옵니다.
// headers: token
export const get_user_teamlist = (token) =>{
    return axios.get(`${config.API_URL}/api/teams/members/teamlist`,{
        headers: {
            token: token
        }
    });
}

// GET /api/items?barcode={barcode}&teamuid={teamuid}
// 팀에 상품에 있는지 확인합니다.
// headers: token
// params: barcode, teamuid
export const get_item = (token, barcode, teamuid) =>{
    console.log(`${config.API_URL}/api/items?barcode=${barcode}&teamuid=${teamuid}`);
    return axios.get(`${config.API_URL}/api/items?barcode=${barcode}&teamuid=${teamuid}`,{
        headers: {
            token: token
        }
    });
}

// GET /api/items/list?barcode={barcode}
// 상품 정보 리스트를 전부 받아옵니다.
// headers: token
// params: barcode
export const get_itemlist = (token, barcode) =>{
    return axios.get(`${config.API_URL}/api/items/list?barcode=${barcode}`,{
        headers: {
            token: token
        }
    });
}

// POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}
// 아이템 생성
// headers: token
// params: barcode, prodname, teamuid
export const set_item = (token, barcode, prodname, teamuid) =>{
    return axios.post(`${config.API_URL}/api/items?barcode=${barcode}&prodname=${prodname}&teamuid=${teamuid}`,{},{
        headers:{
            token: token
        }}
    );
}

// POST /api/deadline?teamuid={teamuid}&goodsid={goodsid}&expdate={expdate}
// 유통기한 생성
// headers: token
// params: teamuid, tagid, goodsid, expdate

export const set_deladine = (token, teamuid, goodsid, expdate) =>{
    return axios.post(`${config.API_URL}/api/deadline?teamuid=${teamuid}&goodsid=${goodsid}&expdate=${expdate}`,{},{
        headers:{
            token: token
        }}
    );
}