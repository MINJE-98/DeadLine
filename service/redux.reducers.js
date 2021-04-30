
export const islogin = (state, action) =>{
    if(typeof state === undefined) {
        console.log(undefined);
        return false;
    }

    switch (action.type){
        case 'login':
            console.log('login');
            return true;
        case 'logout':
            console.log('logout');
            return false;
        default:
            console.log('default');
            return false;
    }
}