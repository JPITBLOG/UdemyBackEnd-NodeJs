import baseService from './basicService';

export function getUserRegister(pssParams){
    return baseService.post('/user/register',pssParams);
}
export function getUserLogin(eml,pswd){
    return baseService.post('/user/login',{eml,pswd});
}
