import axios from 'axios';
const apiurl = `http://10.0.2.2:3000`
// const apiurl = `http://localhost:3000`

export const get_data = (location, data) =>{
        return axios.get(`${apiurl}/api/${location}/${data}`);
}

export const set_data = (location, data) =>{
    return axios.post(`${apiurl}/api/${location}/${data}`);
}

export const get_userinfo = (token) =>{
    return axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`)
}
// 유저 정보를 가져옵니다.
// GET /api/auth
// headers: token
// params: null
export const get_user = ( token ) =>{
    return axios.get(`${apiurl}/api/auth`,{
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
    return axios.post(`${apiurl}/api/auth`,{},{
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
    return axios.post(`${apiurl}/api/teams?teamuid=${teamuid}&teamname=${teamname}`,{},{
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
    return axios.post(`${apiurl}/api/teams/members?teamuid=${teamuid}&state=${state}`,{},{
        headers:{
            token: token
        }}
    );
}
// GET /api/teams/members/teamlist
// 한 유저가 가입한 팀리스트를 가져옵니다.
// headers: token
export const get_user_teamlist = (token) =>{
    return axios.get(`${apiurl}/api/teams/members/teamlist`,{
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
    return axios.get(`${apiurl}/api/items?barcode=${barcode}&teamuid=${teamuid}`,{
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
    return axios.get(`${apiurl}/api/items/list?barcode=${barcode}`,{
        headers: {
            token: token
        }
    });
}