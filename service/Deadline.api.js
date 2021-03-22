import axios from 'axios';


export const get_data = (location, data) =>{
        return axios.get(`http://10.0.2.2:3000/api/${location}/${data}`);
}

export const set_data = (location, data) =>{
    return axios.post(`http://10.0.2.2:3000/api/${location}/${data}`);
}

export const get_userinfo = (token) =>{
    return axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`)
}
// 유저 존재 여부 확인
export const get_user = ( token ) =>{
    return axios.get(`http://10.0.2.2:3000/api/auth`,{
        headers:{
            token: token
        }
    });
}
// 유저 등록
export const set_user = ( token ) =>{
    return axios.post(`http://10.0.2.2:3000/api/auth`,{},{headers:{token: token}});
}

//팀 생성
export const set_team = (token, teamuid, teamname) =>{
    return axios.post(`http://10.0.2.2:3000/api/teams?teamuid=${teamuid}&teamname=${teamname}`,{},{
        headers:{
            token: token
        }}
    );
}
export const join_team = (token, teamuid) =>{
    return axios.post(`http://10.0.2.2:3000/api/teams/members?teamuid=${teamuid}`,{},{
        headers:{
            token: token
        }}
    );
}

export const get_teamList = (token) =>{
    return axios.get(`http://10.0.2.2:3000/api/teams`,{
        headers: {
            token: token
        }
    });
}