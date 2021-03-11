import axios from 'axios';


export const get_data = (location, data) =>{
        return axios.get(`http://localhost:3000/api/${location}/${data}`);
}

export const set_data = (location, data) =>{
    return axios.post(`http://localhost:3000/api/${location}/${data}`);
}

export const get_userinfo = (token) =>{
    return axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`)
}